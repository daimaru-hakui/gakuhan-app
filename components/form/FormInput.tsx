import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { UseFormReturn } from "react-hook-form";
import { cn } from "@/lib/utils";

type FormInputProps = {
  form: UseFormReturn<any, any>;
  name: string;
  type?: string;
  label?: string;
  defaultValue?: string;
  placeholder?: string;
  description?: string;
  require?: boolean;
  className?: string;
  InputProps?: React.ComponentProps<"input">;
};

export function FormInput(props: FormInputProps) {
  const {
    form,
    label,
    name,
    type = "text",
    defaultValue,
    placeholder,
    description,
    require = false,
    className,
    InputProps,
  } = props;
  return (
    <FormField
      control={form.control}
      name={name}
      defaultValue={defaultValue}
      render={({ field }) => (
        <FormItem>
          {label && (
            <FormLabel>
              {label}
              {require && <span className="text-red-500 text-xs ml-1">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <Input
              required={require}
              type={type}
              placeholder={placeholder}
              autoComplete="off"
              {...field}
              className={cn("shadow-none", className)}
              {...InputProps}
            />
          </FormControl>
          {description && <FormDescription> {description} </FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
