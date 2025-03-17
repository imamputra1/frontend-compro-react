import { Button } from "@/components/ui/button";
import logo from "@/assets/logo-angkut-ternak.svg"; // Impor logo SVG
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import PasswordInput from "@/components/ui/passwordinput";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { useAuth } from "@/components/Provider/AuthProvider";

// Schema validasi menggunakan Zod
const loginSchema = z.object({
  email: z.string({ required_error: "Email wajib diisi" }).email({ message: "Email tidak valid" }),
  password: z.string({ required_error: "Password wajib diisi" }).min(8, { message: "Password minimal 8 karakter" }),
});

function LoginPage() {
  const {login} = useAuth();
  const [isLoading, setIsLoading] = useState (false);
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(value) {
    try {
      setIsLoading(true);
      await login(value);
    } catch (error) {
      console.log(error); // Cek struktur error di console
      if (error.meta?.validations) {
        // Menampilkan pesan error validasi untuk setiap field
        Object.keys(error.meta.validations).forEach((key) => {
          form.setError(key, {
            type: "server",
            message: error.meta.validations[key][0], // Ambil pesan error pertama
          });
        });
      } else if (error.meta?.messages?.length > 0) {
        // Menampilkan pesan error umum jika ada
        form.setError("root", {
          type: "server",
          message: error.meta.messages[0],
        });
      } else {
        // Menampilkan pesan error default jika struktur error tidak dikenali
        form.setError("root", {
          type: "server",
          message: "Terjadi kesalahan saat memproses permintaan.",
        });
      }
    } finally{
      setIsLoading(false);
    }
  }
  return (
    <section className="min-h-screen bg-primary flex justify-center items-center">
      <div className="max-w-[480px] w-full p-8 space-y-6">
        {/* Logo dan Teks */}
        <div className="flex flex-col items-center space-y-4">
          <img src={logo} alt="logo" className="w-80 h-30" /> {/* Logo */}
          <h1 className="text-white text-center text-lg font-medium">
            Selamat Datang di Dashboard ANGKUT TERNAK
          </h1>
        </div>

        {/* Card Login */}
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Ayo Min dimasukin dulu!!!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                className="flex flex-col gap-4"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="name@example.com" {...field} className="border-b-2 w-full border-gray-500 rounded-sm p-3" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <PasswordInput placeholder="******" {...field} className="border-b-2 w-full border-gray-500 rounded-sm p-3" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="mt-2" loading={isLoading}>
                  Login
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export default LoginPage;