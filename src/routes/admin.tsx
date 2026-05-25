import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pencil, Plus, Trash2, LogOut, ImagePlus } from "lucide-react";
import { toast } from "sonner";
import { formatPula } from "@/lib/format";
import {
  checkIsAdmin,
  adminStats,
  adminListProducts,
  adminCreateProduct,
  adminUpdateProduct,
  adminDeleteProduct,
  adminListCategories,
  adminUpsertCategory,
  adminDeleteCategory,
  adminListCustomOrders,
  adminUpdateCustomOrderStatus,
} from "@/lib/admin.functions";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
  head: () => ({ meta: [{ title: "Admin Dashboard — J.D & CO BW" }] }),
});

function AdminPage() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);

  const check = useServerFn(checkIsAdmin);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        navigate({ to: "/login" });
        return;
      }
      try {
        const r = await check();
        if (!r.isAdmin) {
          toast.error("This account does not have admin access.");
          navigate({ to: "/" });
          return;
        }
        setReady(true);
      } catch {
        navigate({ to: "/login" });
      }
    })();
  }, [check, navigate]);

  async function logout() {
    await supabase.auth.signOut();
    navigate({ to: "/login" });
  }

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-muted-foreground">
        Checking access…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/20">
      <header className="border-b bg-background sticky top-0 z-30">
        <div className="container-x flex h-14 items-center justify-between">
          <Link to="/" className="display text-lg text-secondary">J.D &amp; CO BW · Admin</Link>
          <Button variant="ghost" size="sm" onClick={logout}>
            <LogOut className="h-4 w-4 mr-2" /> Sign out
          </Button>
        </div>
      </header>
      <main className="container-x py-6">
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5 mb-6">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="homepage">Homepage</TabsTrigger>
            <TabsTrigger value="orders">Custom Orders</TabsTrigger>
          </TabsList>
          <TabsContent value="dashboard"><Dashboard /></TabsContent>
          <TabsContent value="products"><ProductsTab /></TabsContent>
          <TabsContent value="categories"><CategoriesTab /></TabsContent>
          <TabsContent value="homepage"><HomepageTab /></TabsContent>
          <TabsContent value="orders"><OrdersTab /></TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

// ---------- Dashboard ----------
function Dashboard() {
  const fn = useServerFn(adminStats);
  const { data } = useQuery({ queryKey: ["admin-stats"], queryFn: () => fn() });
  const items = [
    { label: "Products", value: data?.products ?? "…" },
    { label: "Categories", value: data?.categories ?? "…" },
    { label: "Total Orders", value: data?.orders ?? "…" },
    { label: "New Orders", value: data?.newOrders ?? "…" },
  ];
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((i) => (
        <Card key={i.label} className="p-5">
          <div className="text-sm text-muted-foreground">{i.label}</div>
          <div className="display text-3xl text-secondary mt-2">{i.value}</div>
        </Card>
      ))}
    </div>
  );
}

// ---------- Products ----------
type ProductRow = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number | string;
  image_url: string | null;
  category_id: string | null;
  sizes: string[];
  colors: string[];
  featured: boolean;
  best_seller: boolean;
  new_arrival: boolean;
  in_stock: boolean;
  categories?: { name: string; slug: string } | null;
};

function ProductsTab() {
  const qc = useQueryClient();
  const list = useServerFn(adminListProducts);
  const cats = useServerFn(adminListCategories);
  const del = useServerFn(adminDeleteProduct);

  const { data: products = [] } = useQuery({ queryKey: ["admin-products"], queryFn: () => list() });
  const { data: categories = [] } = useQuery({ queryKey: ["admin-categories"], queryFn: () => cats() });

  const [editing, setEditing] = useState<ProductRow | null>(null);
  const [creating, setCreating] = useState(false);

  const deleteMut = useMutation({
    mutationFn: (id: string) => del({ data: { id } }),
    onSuccess: () => {
      toast.success("Deleted");
      qc.invalidateQueries({ queryKey: ["admin-products"] });
      qc.invalidateQueries({ queryKey: ["admin-stats"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="display text-2xl text-secondary">Products</h2>
        <Button onClick={() => setCreating(true)}><Plus className="h-4 w-4 mr-2" /> Add product</Button>
      </div>
      <Card className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="hidden md:table-cell">Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="hidden md:table-cell">Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(products as ProductRow[]).map((p) => (
              <TableRow key={p.id}>
                <TableCell>
                  {p.image_url ? (
                    <img src={p.image_url} alt={p.name} className="h-12 w-12 rounded object-cover" />
                  ) : (
                    <div className="h-12 w-12 rounded bg-muted" />
                  )}
                </TableCell>
                <TableCell>
                  <div className="font-medium">{p.name}</div>
                  <div className="text-xs text-muted-foreground">{p.slug}</div>
                </TableCell>
                <TableCell className="hidden md:table-cell">{p.categories?.name ?? "—"}</TableCell>
                <TableCell>{formatPula(Number(p.price))}</TableCell>
                <TableCell className="hidden md:table-cell">
                  <div className="flex flex-wrap gap-1">
                    {p.in_stock ? <Badge variant="secondary">In stock</Badge> : <Badge variant="destructive">Out</Badge>}
                    {p.featured && <Badge>Featured</Badge>}
                    {p.best_seller && <Badge>Best</Badge>}
                    {p.new_arrival && <Badge>New</Badge>}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button size="icon" variant="ghost" onClick={() => setEditing(p)}><Pencil className="h-4 w-4" /></Button>
                  <Button size="icon" variant="ghost" onClick={() => { if (confirm(`Delete ${p.name}?`)) deleteMut.mutate(p.id); }}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {products.length === 0 && (
              <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground py-8">No products yet. Add your first one.</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </Card>

      <ProductDialog
        open={creating || !!editing}
        product={editing}
        categories={categories as { id: string; name: string }[]}
        onClose={() => { setEditing(null); setCreating(false); }}
      />
    </div>
  );
}

function ProductDialog({ open, product, categories, onClose }: {
  open: boolean;
  product: ProductRow | null;
  categories: { id: string; name: string }[];
  onClose: () => void;
}) {
  const qc = useQueryClient();
  const create = useServerFn(adminCreateProduct);
  const update = useServerFn(adminUpdateProduct);
  const [form, setForm] = useState({
    slug: "", name: "", description: "", price: 0,
    image_url: "" as string,
    category_id: "" as string,
    sizes: "" as string,
    colors: "" as string,
    featured: false, best_seller: false, new_arrival: false, in_stock: true,
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (product) {
      setForm({
        slug: product.slug, name: product.name, description: product.description,
        price: Number(product.price),
        image_url: product.image_url ?? "",
        category_id: product.category_id ?? "",
        sizes: product.sizes.join(", "),
        colors: product.colors.join(", "),
        featured: product.featured, best_seller: product.best_seller,
        new_arrival: product.new_arrival, in_stock: product.in_stock,
      });
    } else {
      setForm({ slug: "", name: "", description: "", price: 0, image_url: "", category_id: "", sizes: "", colors: "", featured: false, best_seller: false, new_arrival: false, in_stock: true });
    }
  }, [product, open]);

  async function handleUpload(file: File) {
    setUploading(true);
    const path = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
    const { error } = await supabase.storage.from("product-images").upload(path, file, { upsert: true });
    setUploading(false);
    if (error) return toast.error(error.message);
    const { data } = supabase.storage.from("product-images").getPublicUrl(path);
    setForm((f) => ({ ...f, image_url: data.publicUrl }));
    toast.success("Image uploaded");
  }

  const save = useMutation({
    mutationFn: async () => {
      const payload = {
        slug: form.slug.trim(),
        name: form.name.trim(),
        description: form.description,
        price: Number(form.price),
        image_url: form.image_url || null,
        category_id: form.category_id || null,
        sizes: form.sizes.split(",").map((s) => s.trim()).filter(Boolean),
        colors: form.colors.split(",").map((s) => s.trim()).filter(Boolean),
        featured: form.featured, best_seller: form.best_seller,
        new_arrival: form.new_arrival, in_stock: form.in_stock,
      };
      if (product) return update({ data: { id: product.id, ...payload } });
      return create({ data: payload });
    },
    onSuccess: () => {
      toast.success("Saved");
      qc.invalidateQueries({ queryKey: ["admin-products"] });
      qc.invalidateQueries({ queryKey: ["admin-stats"] });
      onClose();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader><DialogTitle>{product ? "Edit product" : "New product"}</DialogTitle></DialogHeader>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>Slug (lowercase-dashes)</Label>
            <Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>Price (BWP)</Label>
            <Input type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} />
          </div>
          <div className="space-y-2">
            <Label>Category</Label>
            <Select value={form.category_id || "none"} onValueChange={(v) => setForm({ ...form, category_id: v === "none" ? "" : v })}>
              <SelectTrigger><SelectValue placeholder="None" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="none">— None —</SelectItem>
                {categories.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label>Description</Label>
            <Textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label>Image</Label>
            <div className="flex flex-wrap items-center gap-3">
              {form.image_url && <img src={form.image_url} alt="" className="h-16 w-16 rounded object-cover border" />}
              <label className="inline-flex items-center gap-2 border rounded-md px-3 py-2 cursor-pointer text-sm hover:bg-muted">
                <ImagePlus className="h-4 w-4" /> {uploading ? "Uploading…" : "Upload image"}
                <input type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleUpload(f); }} />
              </label>
              <Input placeholder="or paste image URL" value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Sizes (comma separated)</Label>
            <Input value={form.sizes} onChange={(e) => setForm({ ...form, sizes: e.target.value })} placeholder="S, M, L, XL" />
          </div>
          <div className="space-y-2">
            <Label>Colors (comma separated)</Label>
            <Input value={form.colors} onChange={(e) => setForm({ ...form, colors: e.target.value })} placeholder="Black, Tan" />
          </div>
          <div className="sm:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <ToggleField label="In stock" value={form.in_stock} onChange={(v) => setForm({ ...form, in_stock: v })} />
            <ToggleField label="Featured" value={form.featured} onChange={(v) => setForm({ ...form, featured: v })} />
            <ToggleField label="Best seller" value={form.best_seller} onChange={(v) => setForm({ ...form, best_seller: v })} />
            <ToggleField label="New arrival" value={form.new_arrival} onChange={(v) => setForm({ ...form, new_arrival: v })} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={() => save.mutate()} disabled={save.isPending}>{save.isPending ? "Saving…" : "Save"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function ToggleField({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center justify-between gap-2 border rounded-md px-3 py-2">
      <span className="text-sm">{label}</span>
      <Switch checked={value} onCheckedChange={onChange} />
    </label>
  );
}

// ---------- Categories ----------
function CategoriesTab() {
  const qc = useQueryClient();
  const list = useServerFn(adminListCategories);
  const upsert = useServerFn(adminUpsertCategory);
  const del = useServerFn(adminDeleteCategory);
  const { data: rows = [] } = useQuery({ queryKey: ["admin-categories"], queryFn: () => list() });
  const [editing, setEditing] = useState<{ id?: string; name: string; slug: string; sort_order: number } | null>(null);

  const save = useMutation({
    mutationFn: () => upsert({ data: editing! }),
    onSuccess: () => {
      toast.success("Saved"); setEditing(null);
      qc.invalidateQueries({ queryKey: ["admin-categories"] });
      qc.invalidateQueries({ queryKey: ["admin-stats"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });
  const remove = useMutation({
    mutationFn: (id: string) => del({ data: { id } }),
    onSuccess: () => { toast.success("Deleted"); qc.invalidateQueries({ queryKey: ["admin-categories"] }); },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="display text-2xl text-secondary">Categories</h2>
        <Button onClick={() => setEditing({ name: "", slug: "", sort_order: 0 })}>
          <Plus className="h-4 w-4 mr-2" /> Add category
        </Button>
      </div>
      <Card className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow><TableHead>Name</TableHead><TableHead>Slug</TableHead><TableHead>Order</TableHead><TableHead className="text-right">Actions</TableHead></TableRow>
          </TableHeader>
          <TableBody>
            {(rows as { id: string; name: string; slug: string; sort_order: number }[]).map((c) => (
              <TableRow key={c.id}>
                <TableCell className="font-medium">{c.name}</TableCell>
                <TableCell className="text-muted-foreground">{c.slug}</TableCell>
                <TableCell>{c.sort_order}</TableCell>
                <TableCell className="text-right">
                  <Button size="icon" variant="ghost" onClick={() => setEditing(c)}><Pencil className="h-4 w-4" /></Button>
                  <Button size="icon" variant="ghost" onClick={() => { if (confirm(`Delete ${c.name}?`)) remove.mutate(c.id); }}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {rows.length === 0 && <TableRow><TableCell colSpan={4} className="text-center text-muted-foreground py-8">No categories yet.</TableCell></TableRow>}
          </TableBody>
        </Table>
      </Card>

      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editing?.id ? "Edit category" : "New category"}</DialogTitle></DialogHeader>
          {editing && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Slug</Label>
                <Input value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Sort order</Label>
                <Input type="number" value={editing.sort_order} onChange={(e) => setEditing({ ...editing, sort_order: Number(e.target.value) })} />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
            <Button onClick={() => save.mutate()} disabled={save.isPending}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ---------- Homepage ----------
function HomepageTab() {
  const qc = useQueryClient();
  const list = useServerFn(adminListProducts);
  const update = useServerFn(adminUpdateProduct);
  const { data: products = [] } = useQuery({ queryKey: ["admin-products"], queryFn: () => list() });

  const toggle = useMutation({
    mutationFn: (vars: { id: string; field: "featured" | "best_seller" | "new_arrival" | "in_stock"; value: boolean }) =>
      update({ data: { id: vars.id, [vars.field]: vars.value } as never }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-products"] }),
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className="space-y-4">
      <div>
        <h2 className="display text-2xl text-secondary">Homepage & availability</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Toggle which products appear as Featured on the homepage, mark Best Sellers, New Arrivals, and stock status.
        </p>
      </div>
      <Card className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead className="text-center">Featured</TableHead>
              <TableHead className="text-center">Best seller</TableHead>
              <TableHead className="text-center">New arrival</TableHead>
              <TableHead className="text-center">In stock</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(products as ProductRow[]).map((p) => (
              <TableRow key={p.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    {p.image_url ? <img src={p.image_url} className="h-10 w-10 rounded object-cover" alt="" /> : <div className="h-10 w-10 rounded bg-muted" />}
                    <div>
                      <div className="font-medium">{p.name}</div>
                      <div className="text-xs text-muted-foreground">{formatPula(Number(p.price))}</div>
                    </div>
                  </div>
                </TableCell>
                {(["featured", "best_seller", "new_arrival", "in_stock"] as const).map((f) => (
                  <TableCell key={f} className="text-center">
                    <Switch checked={p[f]} onCheckedChange={(v) => toggle.mutate({ id: p.id, field: f, value: v })} />
                  </TableCell>
                ))}
              </TableRow>
            ))}
            {products.length === 0 && <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">Add products first.</TableCell></TableRow>}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

// ---------- Custom orders ----------
type OrderRow = {
  id: string; created_at: string; company: string; contact_name: string; phone: string;
  email: string | null; product_type: string; quantity: string; colors: string | null;
  notes: string | null; file_url: string | null; status: string;
};

function OrdersTab() {
  const qc = useQueryClient();
  const list = useServerFn(adminListCustomOrders);
  const setStatus = useServerFn(adminUpdateCustomOrderStatus);
  const { data: rows = [] } = useQuery({ queryKey: ["admin-orders"], queryFn: () => list() });
  const [viewing, setViewing] = useState<OrderRow | null>(null);

  const statusOptions = ["new", "in-progress", "quoted", "completed", "archived"] as const;
  const mut = useMutation({
    mutationFn: (vars: { id: string; status: typeof statusOptions[number] }) => setStatus({ data: vars }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-orders"] });
      qc.invalidateQueries({ queryKey: ["admin-stats"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const sorted = useMemo(() => [...(rows as OrderRow[])], [rows]);

  return (
    <div className="space-y-4">
      <h2 className="display text-2xl text-secondary">Custom orders</h2>
      <Card className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Received</TableHead>
              <TableHead>Company</TableHead>
              <TableHead className="hidden md:table-cell">Contact</TableHead>
              <TableHead className="hidden md:table-cell">Product</TableHead>
              <TableHead>Qty</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Open</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sorted.map((o) => (
              <TableRow key={o.id}>
                <TableCell className="text-xs">{new Date(o.created_at).toLocaleDateString()}</TableCell>
                <TableCell className="font-medium">{o.company}</TableCell>
                <TableCell className="hidden md:table-cell">{o.contact_name}<div className="text-xs text-muted-foreground">{o.phone}</div></TableCell>
                <TableCell className="hidden md:table-cell">{o.product_type}</TableCell>
                <TableCell>{o.quantity}</TableCell>
                <TableCell>
                  <Select value={o.status} onValueChange={(v) => mut.mutate({ id: o.id, status: v as typeof statusOptions[number] })}>
                    <SelectTrigger className="h-8 w-[130px]"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="text-right">
                  <Button size="sm" variant="outline" onClick={() => setViewing(o)}>View</Button>
                </TableCell>
              </TableRow>
            ))}
            {sorted.length === 0 && <TableRow><TableCell colSpan={7} className="text-center text-muted-foreground py-8">No custom orders yet.</TableCell></TableRow>}
          </TableBody>
        </Table>
      </Card>

      <Dialog open={!!viewing} onOpenChange={(o) => !o && setViewing(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>{viewing?.company}</DialogTitle></DialogHeader>
          {viewing && (
            <div className="space-y-3 text-sm">
              <Detail label="Contact" value={viewing.contact_name} />
              <Detail label="Phone" value={viewing.phone} />
              {viewing.email && <Detail label="Email" value={viewing.email} />}
              <Detail label="Product" value={viewing.product_type} />
              <Detail label="Quantity" value={viewing.quantity} />
              {viewing.colors && <Detail label="Colors" value={viewing.colors} />}
              {viewing.notes && <Detail label="Notes" value={viewing.notes} />}
              {viewing.file_url && (
                <Detail label="File" value={<a href={viewing.file_url} target="_blank" rel="noreferrer" className="text-primary underline">Download</a>} />
              )}
              <Detail label="Received" value={new Date(viewing.created_at).toLocaleString()} />
              <div className="pt-2 flex gap-2 flex-wrap">
                <a className="inline-flex items-center justify-center rounded-md bg-whatsapp text-whatsapp-foreground px-3 py-2 text-sm font-medium"
                  href={`https://wa.me/${viewing.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Hi ${viewing.contact_name}, thanks for your custom order request for ${viewing.company}.`)}`}
                  target="_blank" rel="noreferrer">WhatsApp customer</a>
                {viewing.email && (
                  <a className="inline-flex items-center justify-center rounded-md border px-3 py-2 text-sm font-medium"
                    href={`mailto:${viewing.email}?subject=${encodeURIComponent("Your custom order — J.D & CO BW")}`}>Email</a>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex gap-3">
      <div className="w-24 text-muted-foreground">{label}</div>
      <div className="flex-1 whitespace-pre-wrap">{value}</div>
    </div>
  );
}