"use client";

import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import Modal from "./Modal";
import SmartLink from "./SmartLink";
import SiteForm from "./SiteForm";
import { fixTypos } from "@lib/copyFilters";
import { liveFields } from "@lib/formFields";
import { popupFor } from "@lib/pageForms";

/**
 * A page's main call to action.
 *
 * On the live site, 18 pages open their registration form in a popup when this
 * button is pressed; the rest scroll to a form further down. Which behaviour a
 * page gets is read from the synced form data rather than set per page, so it
 * follows the live site: a page with a live popup opens it in place, with the
 * live popup's title, button label and fields; any other page keeps the anchor.
 */
export default function SignupCta({
  label,
  href = "#signup",
  className,
}: {
  label: string;
  href?: string;
  className?: string;
}) {
  const page = usePathname().split("/").filter(Boolean).pop() ?? "";
  const popup = popupFor(page);
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  if (!popup) {
    return (
      <SmartLink href={href} className={className}>
        {label}
      </SmartLink>
    );
  }

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} aria-haspopup="dialog" className={className}>
        {fixTypos(popup.trigger) || label}
      </button>

      {open && (
        <Modal title={popup.title} onClose={close}>
          {popup.text && <p className="text-slate-500 text-sm mb-5">{popup.text}</p>}
          <div className="mt-5">
            <SiteForm
              fields={liveFields(page) ?? popup.fields}
              theme="light"
              submitLabel={popup.submit}
              context={popup.title}
            />
          </div>
        </Modal>
      )}
    </>
  );
}
