import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
  className="cc-toaster group"
      toastOptions={{
        classNames: {
          toast: "cc-toast",
          description: "cc-toast-description",
          actionButton: "cc-toast-action-btn",
          cancelButton: "cc-toast-cancel-btn",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
