import { usePage } from "@inertiajs/react";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function FlashToasts() {
  const { flash, errors } = usePage().props;

  useEffect(() => {
    if (flash?.success) toast.success(flash.success);
    if (flash?.error) toast.error(flash.error);
    if (errors?.message) toast.error(errors.message);
  }, [flash, errors]);

  return <Toaster position="bottom-right" />;
}
