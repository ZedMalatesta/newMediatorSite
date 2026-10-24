"use client";

import { useCallback, useState } from "react";
import { submitForm, FormNotConfiguredError, type FormKind } from "@lib/submitForm";
import { validateContactFields, validateFields, type FieldErrors } from "@lib/validateForm";
import type { LiveFormField } from "@lib/pageForms";

export type SubmitState = "idle" | "submitting" | "success" | "error";

type Options = {
  /** Field definitions to validate against; without them, name plus one contact. */
  fields?: LiveFormField[];
  /** What the form is for, sent along so the office can tell enquiries apart. */
  context?: string;
  onSuccess?: () => void;
};

/**
 * Shared submit state machine (spec §9). Gives every form validation, an
 * in-flight state, and explicit success and error messaging - so a failure is
 * visible to the visitor instead of silently swallowed.
 */
export function useFormSubmit(kind: FormKind, { fields, context, onSuccess }: Options = {}) {
  const [state, setState] = useState<SubmitState>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [message, setMessage] = useState<string>("");

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.currentTarget;
      // A group of checkboxes shares one name; keep every ticked answer.
      const data: Record<string, string> = {};
      for (const [key, value] of new FormData(form).entries()) {
        data[key] = data[key] ? `${data[key]}, ${value}` : String(value);
      }

      const found = fields ? validateFields(fields, data) : validateContactFields(data);
      setErrors(found);
      if (Object.keys(found).length > 0) {
        setState("error");
        setMessage("Проверьте, пожалуйста, заполненные поля.");
        return;
      }

      setState("submitting");
      try {
        await submitForm(kind, {
          ...data,
          ...(context ? { form: context } : {}),
          page: window.location.pathname,
        });
        setState("success");
        setMessage("Спасибо! Мы получили вашу заявку и свяжемся с вами.");
        form.reset();
        onSuccess?.();
      } catch (err) {
        setState("error");
        setMessage(
          err instanceof FormNotConfiguredError
            ? "Форма пока не подключена. Напишите нам, пожалуйста, в Telegram или на почту."
            : "Не удалось отправить заявку. Попробуйте ещё раз или свяжитесь с нами напрямую.",
        );
      }
    },
    [kind, fields, context, onSuccess],
  );

  return { state, errors, message, handleSubmit };
}
