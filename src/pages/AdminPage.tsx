import { Link, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pencil, Plus, Trash2, LogOut } from "lucide-react";
import { toast } from "sonner";
import { formatPula } from "@/lib/format";
import { api, type ProductInput } from "@/lib/api";
import { logout, getSession } from "@/lib/auth";
import type { Product, Category, CustomOrder } from "@/lib/products";
import { usePageMeta } from "@/hooks/use-page-meta";

export default function AdminPage() {
  usePageMeta("Admin Dashboard — J.D & CO BW");
  const navigate = useNavigate();
  const session = getSession();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-muted/20">
      <header className="border-b bg-background sticky top-0 z-30">
        <div className="container-x flex h-14 items-center justify-between">
          <Link to="/" className="display text-lg text-secondary">J.D &amp; CO BW · Admin</Link>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground hidden sm:inline">{session?.email}</span>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" /> Sign out
            </Button>
          </div>
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
  const { data } = useQuery({ queryKey: ["admin-stats"], queryFn: api.adminStats });
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
type ProductFormState = {
  slug: string; name: string; description: string; price: number;
  imageUrl: string; categorySlug: string; sizes: string; colors: string;
  featured: boolean; bestSeller: boolean; newArrival: boolean; inStock: boolean;
};

const emptyForm: ProductFormState = {
  slug: "", name: "", description: "", price: 0, imageUrl: "", categorySlug: "",
  sizes: "", colors: "", featured: false, bestSeller: false, newArrival: false, inStock: true,
};

function ProductsTab() {
  const qc = useQueryClient();
  const { data: products = [] } = useQuery({ queryKey: ["admin-products"], queryFn: api.listProducts });
  const { data: categories = [] } = useQuery({ queryKey: ["admin-categories"], queryFn: api.listCategories });
  const [editing, setEditing] = useState<Product | null>(null);
  const [creating, setCreating] = useState(false);

  const del = useMutation({
    mutationFn: (id: string) => api.adminDeleteProduct(id),
    onSuccess: () => {
      toast.success("Deleted");
      qc.invalidateQueries({ queryKey: ["admin-products"] });
      qc.invalidateQueries({ queryKey: ["products"] });
      qc.invalidateQueries({ queryKey: ["admin-stats"] });
    },
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
            {products.map((p) => (
              <TableRow key={p.id}>
                <TableCell>
                  <img src={p.image} alt={p.name} className="h-12 w-12 rounded object-cover" />
                </TableCell>
                <TableCell>
                  <div className="font-medium">{p.name}</div>
                  <div className="text-xs text-muted-foreground">{p.slug}</div>
                </TableCell>
                <TableCell className="hidden md:table-cell">{p.category}</TableCell>
                <TableCell>{formatPula(p.price)}</TableCell>
                <TableCell className="hidden md:table-cell">
                  <div className="flex flex-wrap gap-1">
                    {p.inStock ? <Badge variant="secondary">In stock</Badge> : <Badge variant="destructive">Out</Badge>}
                    {p.featured && <Badge>Featured</Badge>}
                    {p.bestSeller && <Badge>Best</Badge>}
                    {p.newArrival && <Badge>New</Badge>}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button size="icon" variant="ghost" onClick={() => setEditing(p)}><Pencil className="h-4 w-4" /></Button>
                  <Button size="icon" variant="ghost" onClick={() => { if (confirm(`Delete ${p.name}?`)) del.mutate(p.id); }}>
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
        categories={categories}
        onClose={() => { setEditing(null); setCreating(false); }}
      />
    </div>
  );
}

function ProductDialog({ open, product, categories, onClose }: {
  open: boolean;
  product: Product | null;
  categories: Category[];
  onClose: () => void;
}) {
  const qc = useQueryClient();
  const [form, setForm] = useState<ProductFormState>(emptyForm);

  useEffect(() => {
    if (product) {
      setForm({
        slug: product.slug, name: product.name, description: product.description,
        price: product.price,
        imageUrl: product.imageUrl ?? "",
        categorySlug: product.categorySlug,
        sizes: product.sizes.join(", "),
        colors: product.colors.join(", "),
        featured: product.featured, bestSeller: product.bestSeller,
        newArrival: product.newArrival, inStock: product.inStock,
      });
    } else {
      setForm(emptyForm);
    }
  }, [product, open]);

  const save = useMutation({
    mutationFn: async () => {
      const payload: ProductInput = {
        slug: form.slug.trim(),
        name: form.name.trim(),
        description: form.description,
        price: Number(form.price),
        imageUrl: form.imageUrl || null,
        categorySlug: form.categorySlug,
        sizes: form.sizes.split(",").map((s) => s.trim()).filter(Boolean),
        colors: form.colors.split(",").map((s) => s.trim()).filter(Boolean),
        featured: form.featured, bestSeller: form.bestSeller,
        newArrival: form.newArrival, inStock: form.inStock,
      };
      if (product) return api.adminUpdateProduct(product.id, payload);
      return api.adminCreateProduct(payload);
    },
    onSuccess: () => {
      toast.success("Saved");
      qc.invalidateQueries({ queryKey: ["admin-products"] });
      qc.invalidateQueries({ queryKey: ["products"] });
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
            <Select value={form.categorySlug || "none"} onValueChange={(v) => setForm({ ...form, categorySlug: v === "none" ? "" : v })}>
              <SelectTrigger><SelectValue placeholder="None" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="none">— None —</SelectItem>
                {categories.map((c) => <SelectItem key={c.id} value={c.slug}>{c.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label>Description</Label>
            <Textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label>Image URL</Label>
            <div className="flex items-center gap-3">
              {form.imageUrl && <img src={form.imageUrl} alt="" className="h-16 w-16 rounded object-cover border" />}
              <Input placeholder="https://…" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} />
            </div>
            <p className="text-xs text-muted-foreground">
              File uploads need a backend — wire to your Mongo/S3 stack in <code>src/lib/api.ts</code>.
            </p>
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
            <ToggleField label="In stock" value={form.inStock} onChange={(v) => setForm({ ...form, inStock: v })} />
            <ToggleField label="Featured" value={form.featured} onChange={(v) => setForm({ ...form, featured: v })} />
            <ToggleField label="Best seller" value={form.bestSeller} onChange={(v) => setForm({ ...form, bestSeller: v })} />
            <ToggleField label="New arrival" value={form.newArrival} onChange={(v) => setForm({ ...form, newArrival: v })} />
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
type CategoryEdit = { id?: string; name: string; slug: string; sortOrder: number };

function CategoriesTab() {
  const qc = useQueryClient();
  const { data: rows = [] } = useQuery({ queryKey: ["admin-categories"], queryFn: api.listCategories });
  const [editing, setEditing] = useState<CategoryEdit | null>(null);

  const save = useMutation({
    mutationFn: () => api.adminUpsertCategory(editing!),
    onSuccess: () => {
      toast.success("Saved"); setEditing(null);
      qc.invalidateQueries({ queryKey: ["admin-categories"] });
      qc.invalidateQueries({ queryKey: ["categories"] });
      qc.invalidateQueries({ queryKey: ["admin-stats"] });
    },
  });
  const remove = useMutation({
    mutationFn: (id: string) => api.adminDeleteCategory(id),
    onSuccess: () => {
      toast.success("Deleted");
      qc.invalidateQueries({ queryKey: ["admin-categories"] });
      qc.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="display text-2xl text-secondary">Categories</h2>
        <Button onClick={() => setEditing({ name: "", slug: "", sortOrder: 0 })}>
          <Plus className="h-4 w-4 mr-2" /> Add category
        </Button>
      </div>
      <Card className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead><TableHead>Slug</TableHead><TableHead>Order</TableHead><TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((c) => (
              <TableRow key={c.id}>
                <TableCell className="font-medium">{c.name}</TableCell>
                <TableCell className="text-muted-foreground">{c.slug}</TableCell>
                <TableCell>{c.sortOrder}</TableCell>
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
                <Input type="number" value={editing.sortOrder} onChange={(e) => setEditing({ ...editing, sortOrder: Number(e.target.value) })} />
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

// ---------- Homepage / availability ----------
function HomepageTab() {
  const qc = useQueryClient();
  const { data: products = [] } = useQuery({ queryKey: ["admin-products"], queryFn: api.listProducts });

  const toggle = useMutation({
    mutationFn: (vars: { id: string; field: "featured" | "bestSeller" | "newArrival" | "inStock"; value: boolean }) =>
      api.adminUpdateProduct(vars.id, { [vars.field]: vars.value } as Partial<ProductInput>),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-products"] });
      qc.invalidateQueries({ queryKey: ["products"] });
    },
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
            {products.map((p) => (
              <TableRow key={p.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img src={p.image} className="h-10 w-10 rounded object-cover" alt="" />
                    <div>
                      <div className="font-medium">{p.name}</div>
                      <div className="text-xs text-muted-foreground">{formatPula(p.price)}</div>
                    </div>
                  </div>
                </TableCell>
                {(["featured", "bestSeller", "newArrival", "inStock"] as const).map((f) => (
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
function OrdersTab() {
  const qc = useQueryClient();
  const { data: rows = [] } = useQuery({ queryKey: ["admin-orders"], queryFn: api.listCustomOrders });
  const [viewing, setViewing] = useState<CustomOrder | null>(null);

  const statusOptions = ["new", "in-progress", "quoted", "completed", "archived"] as const;
  const mut = useMutation({
    mutationFn: (vars: { id: string; status: CustomOrder["status"] }) => api.adminUpdateOrderStatus(vars.id, vars.status),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-orders"] });
      qc.invalidateQueries({ queryKey: ["admin-stats"] });
    },
  });

  const sorted = useMemo(() => [...rows], [rows]);

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
                <TableCell className="text-xs">{new Date(o.createdAt).toLocaleDateString()}</TableCell>
                <TableCell className="font-medium">{o.company}</TableCell>
                <TableCell className="hidden md:table-cell">{o.contactName}<div className="text-xs text-muted-foreground">{o.phone}</div></TableCell>
                <TableCell className="hidden md:table-cell">{o.productType}</TableCell>
                <TableCell>{o.quantity}</TableCell>
                <TableCell>
                  <Select value={o.status} onValueChange={(v) => mut.mutate({ id: o.id, status: v as CustomOrder["status"] })}>
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
              <Detail label="Contact" value={viewing.contactName} />
              <Detail label="Phone" value={viewing.phone} />
              {viewing.email && <Detail label="Email" value={viewing.email} />}
              <Detail label="Product" value={viewing.productType} />
              <Detail label="Quantity" value={viewing.quantity} />
              {viewing.colors && <Detail label="Colors" value={viewing.colors} />}
              {viewing.notes && <Detail label="Notes" value={viewing.notes} />}
              <Detail label="Received" value={new Date(viewing.createdAt).toLocaleString()} />
              <div className="pt-2 flex gap-2 flex-wrap">
                <a className="inline-flex items-center justify-center rounded-md bg-whatsapp text-whatsapp-foreground px-3 py-2 text-sm font-medium"
                  href={`https://wa.me/${viewing.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Hi ${viewing.contactName}, thanks for your custom order request for ${viewing.company}.`)}`}
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
