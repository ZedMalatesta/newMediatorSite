"use client";

import { useCallback, useState } from "react";
import { submitForm, FormNotConfiguredError, type FormKind } from "@lib/submitForm";
import { validateContactFields, type FieldErrors } from "@lib/validateForm";

export type SubmitState = "idle" | "submitting" | "success" | "error";

/**
 * Shared submit state machine (spec §9). Gives every form validation, an
 * in-flight state, and explicit success and error messaging - so a failure is
 * visible to the visitor instead of silently swallowed.
 */
export function useFormSubmit(kind: FormKind) {
  const [state, setState] = useState<SubmitState>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [message, setMessage] = useState<string>("");

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.currentTarget;
      const data = Object.fromEntries(
        Array.from(new FormData(form).entries()).map(([k, v]) => [k, String(v)]),
      );

      const found = validateContactFields(data);
      setErrors(found);
      if (Object.keys(found).length > 0) {
        setState("error");
        setMessage("Проверьте, пожалуйста, заполненные поля.");
        return;
      }

      setState("submitting");
      try {
        await submitForm(kind, data);
        setState("success");
        setMessage("Спасибо! Мы получили вашу заявку и свяжемся с вами.");
        form.reset();
      } catch (err) {
        setState("error");
        setMessage(
          err instanceof FormNotConfiguredError
            ? "Форма пока не подключена. Напишите нам, пожалуйста, в Telegram или на почту."
            : "Не удалось отправить заявку. Попробуйте ещё раз или свяжитесь с нами напрямую.",
        );
      }
    },
    [kind],
  );

  return { state, errors, message, handleSubmit };
}
