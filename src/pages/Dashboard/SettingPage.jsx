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
import YoutubeIcon from "@/components/icon/youtube";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/Provider/AuthProvider";
import useGet from "@/hooks/useGet";
import { useEffect, useState } from "react";
import $fetch from "@/lib/fetch";

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
  youtube: z
    .string({ required_error: "value is required" })
    .url("value  yang anda masukan tidak sesuai"),
  facebook: z
    .string({ required_error: "value is required" })
    .url("value  yang anda masukan tidak sesuai"),
  instagram: z
    .string({ required_error: "value is required" })
    .url("value  yang anda masukan tidak sesuai"),
  linked: z
    .string({ required_error: "value is required" })
    .url("value  yang anda masukan tidak sesuai"),
});

export default function SettingPage() {
  const{profile} = useAuth();

  const [loadingSave, setLoadingSave] = useState(false);

  const{ data } = useGet('/api/get-setting')

  const form = useForm({
    resolver: zodResolver(settingSchema),
    defaultValues: {
      video_url: "",
      phone_number: "",
      email: "",
      youtube: "",
      facebook: "",
      instagram: "",
      linked: "",
    },
  });

  useEffect(() => {
    form.reset({
      video_url: data?.data?.video_url,
      phone_number: data?.data?.phone_number,
      email: data?.data?.email,
      youtube: data?.data?.youtube,
      facebook: data?.data?.facebook,
      instagram: data?.data?.instagram,
      linked: data?.data?.linked,
    });
  }, [data]);

  async function onSubmit(values) {
    try {
      setLoadingSave(true); // Set loading state to true
      const response = await $fetch.create("/api/update-setting", values);
  
      // Reset form manually (jika form dikelola secara manual)
      // Contoh: setFormState({ video_url: response.data.video_url, ... });
      console.log("Form updated successfully:", response.data);
  
      // Tampilkan pesan sukses (bisa menggunakan alert atau console.log)
      alert("Success update setting");
      console.log("Success update setting");
  
    } catch (error) {
      // Handle error tanpa toast
      if (error.meta?.messages?.[0]) {
        console.error("Error:", error.meta.messages[0]);
        alert("Error: " + error.meta.messages[0]); // Tampilkan pesan error menggunakan alert
        return;
      }
  
      // Handle validasi error (jika ada)
      if (error.meta?.validations) {
        Object.keys(error.meta.validations).forEach((key) => {
          console.error(`Validation error for ${key}:`, error.meta.validations[key][0]);
          // Jika Anda mengelola error state secara manual:
          // setErrors((prevErrors) => ({
          //   ...prevErrors,
          //   [key]: error.meta.validations[key][0],
          // }));
        });
      } else {
        console.error("An unexpected error occurred:", error);
        alert("An unexpected error occurred. Please try again."); // Tampilkan pesan error umum
      }
    } finally {
      setLoadingSave(false); // Set loading state to false
    }
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
                  <FormLabel> video_url</FormLabel>
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
                  <FormLabel>phone_number</FormLabel>
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
                name="youtube"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex gap-2">
                      <YoutubeIcon />
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
                name="facebook"
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
                name="instagram"
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
                name="linked"
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