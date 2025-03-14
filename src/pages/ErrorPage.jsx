import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline"; // Ikon error
import logo from "@/assets/logo-angkut-ternak.svg"; // Impor logo SVG


const ErrorHandling = () => {
  const navigate = useNavigate();

  // Fungsi untuk kembali ke halaman sebelumnya
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <section className="min-h-screen bg-primary flex flex-col justify-center items-center">
      <img src={logo} alt="logo" className="w-80 h-40" /> {/* Logo */}  
      <Card className="max-w-[480px] w-full p-1 space-y-">
        <CardHeader>
          <div className="flex flex-col items-center gap-4">
            {/* Ikon Error */}
            <ErrorOutlineIcon className="text-blue-500" style={{ fontSize: 80 }} />
            <CardTitle className="text-center text-2xl font-bold text-blue-500">
              Oops! Halaman Tujuan Kamu Tidak Ditemukan  .
            </CardTitle>
          </div>
          <CardDescription className="text-center text-gray-600">
            Coba lagi nanti yayaya, atau kembali ke halaman sebelumnya aja.

          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center">
            <Button
              onClick={handleGoBack}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              Kembali
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default ErrorHandling;