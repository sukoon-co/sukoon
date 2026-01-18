"use client";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Phone, Mail, MapPin } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ContactSection() {
  const { t } = useI18n();
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [servicePrices, setServicePrices] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const services = [
    { id: "coworking", key: "coworking" },
    { id: "private", key: "private" },
    { id: "meeting", key: "meeting" },
    { id: "training", key: "training" },
  ];

  const handleServiceChange = (serviceId: string, checked: boolean) => {
    if (checked) {
      setSelectedServices([...selectedServices, serviceId]);
    } else {
      setSelectedServices(selectedServices.filter((id) => id !== serviceId));
      const newPrices = { ...servicePrices };
      delete newPrices[serviceId];
      setServicePrices(newPrices);
    }
  };

  const handlePriceChange = (serviceId: string, price: string) => {
    setServicePrices({ ...servicePrices, [serviceId]: price });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const serviceNames = {
        coworking: "Shared Workspace",
        private: "Private Offices",
        meeting: "Meeting Rooms",
        training: "Training Space"
      };
      
      const selectedServicesData = selectedServices.map((serviceId) => ({
        service: serviceNames[serviceId as keyof typeof serviceNames],
        price: parseInt(servicePrices[serviceId] || "0"),
      }));

      const payload = {
        ...formData,
        selectedServices: selectedServicesData,
      };

      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbxPlz8amqBYLtFpmTAHmOxIFxotSc0cEx1nMkwC9XD4S44gXexbZDqqWm_7H8lmyKc/exec",
        {
          method: "POST",
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();

      if (result.result === "success") {
        setSubmitStatus("success");
        setFormData({ firstName: "", lastName: "", email: "", phone: "", notes: "" });
        setSelectedServices([]);
        setServicePrices({});
        // Reset checkboxes
        services.forEach(service => {
          const checkbox = document.getElementById(service.id) as HTMLInputElement;
          if (checkbox) checkbox.checked = false;
        });
        toast.success(t("contact.form.success"));
      } else {
        setSubmitStatus("error");
        toast.error(t("contact.form.error"));
      }
    } catch (error) {
      setSubmitStatus("error");
      toast.error(t("contact.form.error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t("contact.title")}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t("contact.form.notesPlaceholder")}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">{t("contact.form.title")}</h3>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("contact.form.firstName")}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder={t("contact.form.firstNamePlaceholder")}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("contact.form.lastName")}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder={t("contact.form.lastNamePlaceholder")}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("contact.form.email")}
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder={t("contact.form.emailPlaceholder")}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("contact.form.phone")}
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="+963 123 456 789"
                  />
                </div>

                {/* <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("contact.form.services")}
                  </label>
                  <div className="space-y-3">
                    {services.map((service) => (
                      <div
                        key={service.id}
                        className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-colors"
                      >
                        <div className="flex items-center mb-3">
                          <input
                            type="checkbox"
                            id={service.id}
                            className="h-5 w-5 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                            style={{ marginInlineEnd: "5px" }}
                            onChange={(e) => handleServiceChange(service.id, e.target.checked)}
                          />
                          <label htmlFor={service.id} className="ml-3 text-base font-medium text-gray-900">
                            {t(`services.${service.key}.title`)}
                          </label>
                        </div>
                        {selectedServices.includes(service.id) && (
                          <div className="ml-8 bg-gray-50 p-3 rounded-md">
                            <div className="flex items-center space-x-3">
                              <span className="text-sm font-medium text-gray-700">
                                {service.id === "training" || service.id === "meeting"
                                  ? t("contact.form.canRentHour")
                                  : t("contact.form.canRent")}
                                :
                              </span>
                              <div className="flex items-center">
                                <input
                                  type="number"
                                  className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent text-center"
                                  placeholder="100"
                                  value={servicePrices[service.id] || ""}
                                  onChange={(e) => handlePriceChange(service.id, e.target.value)}
                                />
                                <span className="ml-2 text-sm font-medium text-gray-600">
                                  $
                                  {service.id === "training" || service.id === "meeting" ? "/hour" : "/month"}
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div> */}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("contact.form.notes")}
                  </label>
                  <textarea
                    rows={4}
                    value={formData.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder={t("contact.form.notesPlaceholder")}
                  ></textarea>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white py-3"
                >
                  {isSubmitting ? t("contact.form.submitting") : t("contact.form.submit")}
                </Button>

                {submitStatus === "success" && (
                  <div className="text-green-600 text-center font-medium">{t("contact.form.success")}</div>
                )}

                {submitStatus === "error" && (
                  <div className="text-red-600 text-center font-medium">{t("contact.form.error")}</div>
                )}
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">
                {t("contact.info.title")}
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{t("contact.info.addressLabel")}</p>
                    <p className="text-gray-600">{t("contact.info.address")}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{t("contact.info.phoneLabel")}</p>
                    <p className="text-gray-600" style={{ direction: 'ltr' }}>{t("contact.info.phone")}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{t("contact.info.emailLabel")}</p>
                    <p className="text-gray-600">{t("contact.info.email")}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{t("contact.info.hoursLabel")}</p>
                    <p className="text-gray-600">{t("contact.info.hours")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">
              {t("contact.location.title")}
            </h3>
            <div className="relative h-96 bg-gray-200 rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d831.5836533870474!2d36.29440656963729!3d33.518684816422116!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1518e700334aaa2d%3A0x6145dc484737d5f4!2sSukoon%20Business%20Cafe!5e0!3m2!1sen!2s!4v1768724822345!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              ></iframe>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h4 className="font-bold text-gray-900 mb-2">
                {t("contact.location.primeTitle")}
              </h4>
              <p className="text-gray-600 mb-4">
                {t("contact.location.description")}
              </p>
              <div className="flex flex-wrap gap-2">
                {t("contact.location.features", []).map((feature: string, index: number) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
