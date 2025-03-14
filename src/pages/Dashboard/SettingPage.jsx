import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Title } from "@/components/ui/title";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import InstagramIcon from "@/components/icon/instagram";
import LinkedinIcon from "@/components/icon/linkedin";
import FacebookIcon from "@/components/icon/facebook";
import TwitterIcon from "@/components/icon/twiter";
import { Button } from "@/components/ui/button";

const settingSchema = z.object({
  video_url: z
    .string({ required_error: "Video is required" })
    .url("Link video yang anda masukan tidak sesuai"),
  phone_number: z
    .string({ required_error: "Phone number is required" })
    .regex(/^[+]?\d+(-\d+)*$/, "Format nomor salah/nomor tidak ditemukan"),
  email: z
    .string({ required_error: "Email wajib diisi" })
    .email({ message: "Email yang anda masukan tidak sesuai" }),
  x_url: z
    .string({ required_error: "value is required" })
    .url("value  yang anda masukan tidak sesuai"),
  facebook_url: z
    .string({ required_error: "value is required" })
    .url("value  yang anda masukan tidak sesuai"),
  instagram_url: z
    .string({ required_error: "value is required" })
    .url("value  yang anda masukan tidak sesuai"),
  linkedin_url: z
    .string({ required_error: "value is required" })
    .url("value  yang anda masukan tidak sesuai"),
});

export default function SettingPage() {
  const form = useForm({
    resolver: zodResolver(settingSchema),
    defaultValues: {
      video_url: "",
      phone_number: "",
      email: "",
      x_url: "",
      facebook_url: "",
      instagram_url: "",
      linkedin_url: "",
    },
  });

  function onSubmit(value) {
    console.log(value);
  }

  return (
    <div>
      <Title title={'PENGATURAN'} caption={'Pastikan input yang dimasukan dalam form sesuai dengan format yang sesuai.'} />
      <Form {...form}>
        <form
          className="grid grid-cols-2 gap-10 pb-8 pl-10"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="space-y-8">
            <FormField
              control={form.control}
              name="video_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Video youtube (url)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://www.youtube.com/watch?v=NL78mGiK2jA"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nomor Handphone</FormLabel>
                  <FormDescription>
                  Tambahkan nomor telepon agar pengguna tahu di mana mereka dapat menghubungi kita.
                  </FormDescription>
                  <FormControl>
                    <Input placeholder="+62-813-8676-1111" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormDescription>
                  Tambahkan Email agar pengguna tahu di mana mereka dapat menghubungi kita.
                  </FormDescription>
                  <FormControl>
                    <Input placeholder="email@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-3">
              <Label>Social Media</Label>
              <FormField
                control={form.control}
                name="x_url"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex gap-2">
                      <TwitterIcon />
                      <FormControl>
                        <Input
                          placeholder="https://x.com/username"
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="facebook_url"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex gap-2">
                      <FacebookIcon />
                      <FormControl>
                        <Input
                          placeholder="https://facebook.com/username"
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="instagram_url"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex gap-2">
                      <InstagramIcon />
                      <FormControl>
                        <Input
                          placeholder="https://instagram.com/username"
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="linkedin_url"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex gap-2">
                      <LinkedinIcon />
                      <FormControl>
                        <Input
                          placeholder="https://linkedin.com/in/username"
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="mt-2">Save</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}