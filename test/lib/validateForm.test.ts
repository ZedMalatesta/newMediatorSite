import { describe, expect, it } from "vitest";
import { validateContactFields, validateFields } from "@lib/validateForm";
import { field } from "@lib/formFields";

describe("validateContactFields", () => {
  it("accepts a name with either way to reply", () => {
    expect(validateContactFields({ name: "Анна", email: "anna@example.by" })).toEqual({});
    expect(validateContactFields({ name: "Анна", phone: "+375 (29) 867-82-40" })).toEqual({});
  });

  it("asks for a name and for some way to reply", () => {
    expect(validateContactFields({})).toEqual({
      name: "Укажите имя",
      contact: "Укажите email или телефон, чтобы мы могли ответить",
    });
  });

  it("rejects an address or number that cannot be right", () => {
    const errors = validateContactFields({ name: "Анна", email: "anna@", phone: "12" });
    expect(errors.email).toBe("Проверьте адрес электронной почты");
    expect(errors.phone).toBe("Проверьте номер телефона");
    expect(errors.contact).toBeUndefined();
  });
});

describe("validateFields", () => {
  const fields = [field.name(), field.email(), field.phone()];

  it("passes a complete form with consent", () => {
    expect(validateFields(fields, { name: "Анна", email: "a@b.by", phone: "+375291234567", consent: "yes" })).toEqual({});
  });

  it("requires whatever the form marks required", () => {
    const errors = validateFields([field.name()], { consent: "yes" });
    expect(errors.name).toBe("Заполните это поле");
  });

  it("checks the format of an email or phone that was entered", () => {
    const errors = validateFields(fields, { name: "Анна", email: "nope", phone: "abc", consent: "yes" });
    expect(errors.email).toBe("Проверьте адрес электронной почты");
    expect(errors.phone).toBe("Проверьте номер телефона");
  });

  it("needs one way to reply when neither contact field is required", () => {
    const optional = [
      { key: "email", kind: "email" as const, label: "Email", required: false },
      { key: "phone", kind: "phone" as const, label: "Телефон", required: false },
    ];
    expect(validateFields(optional, { consent: "yes" }).contact).toBe(
      "Укажите email или телефон, чтобы мы могли ответить",
    );
    expect(validateFields(optional, { phone: "+375291234567", consent: "yes" })).toEqual({});
  });

  it("requires consent unless told not to", () => {
    expect(validateFields([], {}).consent).toBe("Подтвердите согласие на обработку данных");
    expect(validateFields([], {}, false)).toEqual({});
  });
});
