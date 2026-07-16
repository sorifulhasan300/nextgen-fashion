"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/context/ToastContext";
import { cn } from "@/lib/utils";

const contactInfo = [
  {
    icon: MapPin,
    label: "Address",
    value: "123 Fashion Avenue, Design District, New York, NY 10001",
  },
  {
    icon: Mail,
    label: "Email",
    value: "hello@oxivos.com",
    href: "mailto:hello@oxivos.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "01688399676",
    href: "tel:01688399676",
  },
  {
    icon: Clock,
    label: "Business Hours",
    value: "Monday – Friday: 9:00 AM – 6:00 PM EST",
  },
];

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    subject?: string;
    message?: string;
  }>({});

  const { showToast } = useToast();

  const validate = useCallback(() => {
    const newErrors: typeof errors = {};

    if (!fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    }

    if (!email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!subject.trim()) {
      newErrors.subject = "Subject is required.";
    }

    if (!message.trim()) {
      newErrors.message = "Message is required.";
    } else if (message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [fullName, email, subject, message]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!validate()) return;

      setIsSubmitting(true);

      await new Promise((resolve) => setTimeout(resolve, 1500));

      setFullName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setErrors({});
      setIsSubmitting(false);

      showToast({
        message: "Thank you! Your message has been sent successfully.",
        label: "Contact Form",
        type: "info",
      });
    },
    [validate, showToast]
  );

  return (
    <div className="min-h-screen">
      <section className="relative flex items-center justify-center overflow-hidden bg-neutral-800 py-28 md:py-36 lg:py-44">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/60 via-neutral-900/40 to-neutral-900/70" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-10 mx-auto max-w-[1440px] px-5 md:px-8 lg:px-12 text-center"
        >
          <span className="text-[11px] font-bold tracking-[0.25em] text-neutral-300 uppercase">
            Get In Touch
          </span>
          <h1 className="mt-4 text-4xl font-medium tracking-tight text-white md:text-5xl lg:text-[3.5rem] leading-[1.1]">
            Contact Us
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-[15px] leading-relaxed text-neutral-300">
            We would love to hear from you. Reach out and our team will get back
            to you as soon as possible.
          </p>
        </motion.div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 md:px-8 lg:px-12 py-16 md:py-24 lg:py-32">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-10"
          >
            <div>
              <span className="text-[11px] font-bold tracking-[0.2em] text-neutral-400 uppercase">
                Contact Information
              </span>
              <h2 className="mt-4 text-3xl font-medium tracking-tight text-neutral-800 md:text-4xl lg:text-[2.75rem] leading-[1.15]">
                Let us start a conversation
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-neutral-500">
                Fill out the form and our team will get back to you within 24
                hours. Or reach us directly using the contact details below.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map(({ icon: Icon, label, value, href }) => (
                <div
                  key={label}
                  className="flex items-start gap-4"
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-neutral-100">
                    <Icon
                      strokeWidth={1.5}
                      className="size-4.5 text-neutral-700"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold tracking-[0.18em] text-neutral-400 uppercase">
                      {label}
                    </span>
                    {href ? (
                      <a
                        href={href}
                        className="mt-1 block text-[15px] font-medium text-neutral-700 transition-colors hover:text-neutral-900"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="mt-1 text-[15px] text-neutral-700">
                        {value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          >
            <div className="rounded-[1.25rem] border border-neutral-200 bg-white p-8 shadow-sm md:p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="fullName"
                    className="text-[11px] font-bold tracking-[0.18em] text-neutral-500 uppercase"
                  >
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
                    }}
                    placeholder="Your full name"
                    className={cn(
                      "mt-2 w-full rounded-[0.625rem] border bg-transparent px-4 py-2.5 text-[14px] text-neutral-700 placeholder:text-neutral-300 outline-none transition-colors",
                      errors.fullName
                        ? "border-destructive focus-visible:border-destructive"
                        : "border-neutral-200 focus-visible:border-neutral-400"
                    )}
                  />
                  {errors.fullName && (
                    <p className="mt-1.5 text-[13px] text-destructive">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="text-[11px] font-bold tracking-[0.18em] text-neutral-500 uppercase"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                    }}
                    placeholder="you@example.com"
                    className={cn(
                      "mt-2 w-full rounded-[0.625rem] border bg-transparent px-4 py-2.5 text-[14px] text-neutral-700 placeholder:text-neutral-300 outline-none transition-colors",
                      errors.email
                        ? "border-destructive focus-visible:border-destructive"
                        : "border-neutral-200 focus-visible:border-neutral-400"
                    )}
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-[13px] text-destructive">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="text-[11px] font-bold tracking-[0.18em] text-neutral-500 uppercase"
                  >
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    value={subject}
                    onChange={(e) => {
                      setSubject(e.target.value);
                      if (errors.subject) setErrors((prev) => ({ ...prev, subject: undefined }));
                    }}
                    placeholder="How can we help?"
                    className={cn(
                      "mt-2 w-full rounded-[0.625rem] border bg-transparent px-4 py-2.5 text-[14px] text-neutral-700 placeholder:text-neutral-300 outline-none transition-colors",
                      errors.subject
                        ? "border-destructive focus-visible:border-destructive"
                        : "border-neutral-200 focus-visible:border-neutral-400"
                    )}
                  />
                  {errors.subject && (
                    <p className="mt-1.5 text-[13px] text-destructive">
                      {errors.subject}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="text-[11px] font-bold tracking-[0.18em] text-neutral-500 uppercase"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
                    }}
                    placeholder="Tell us more about your inquiry..."
                    rows={5}
                    className={cn(
                      "mt-2 w-full rounded-[0.625rem] border bg-transparent px-4 py-2.5 text-[14px] text-neutral-700 placeholder:text-neutral-300 outline-none transition-colors resize-none",
                      errors.message
                        ? "border-destructive focus-visible:border-destructive"
                        : "border-neutral-200 focus-visible:border-neutral-400"
                    )}
                  />
                  {errors.message && (
                    <p className="mt-1.5 text-[13px] text-destructive">
                      {errors.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="h-10 w-full rounded-lg bg-neutral-800 px-8 text-[12px] font-semibold tracking-[0.1em] uppercase text-white hover:bg-neutral-700 disabled:opacity-60"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
