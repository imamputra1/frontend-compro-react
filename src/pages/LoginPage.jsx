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

// Schema validasi menggunakan Zod
const loginSchema = z.object({
  email: z.string({ required_error: "Email wajib diisi" }).email({ message: "Email tidak valid" }),
  password: z.string({ required_error: "Password wajib diisi" }).min(8, { message: "Password minimal 8 karakter" }),
});

function LoginPage() {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(value) {
    console.log(value);
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

                <Button type="submit" className="mt-2">
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