"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { 
  Check, Calendar as CalendarIcon, Clock, User, Phone, Mail, 
  Sparkles, CheckCircle2, ArrowRight, ArrowLeft, MessageSquare 
} from "lucide-react";
import { INITIAL_SERVICES, SALON_INFO, ServiceItem } from "@/lib/mock-data";
import { createAppointment } from "@/lib/api";

function BookingWidgetContent() {
  const searchParams = useSearchParams();
  const preselectedServiceId = searchParams.get("serviceId");

  const [step, setStep] = useState<number>(1);
  const [services, setServices] = useState<ServiceItem[]>(INITIAL_SERVICES);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [customerName, setCustomerName] = useState<string>("");
  const [customerPhone, setCustomerPhone] = useState<string>("");
  const [customerEmail, setCustomerEmail] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [confirmedAppointment, setConfirmedAppointment] = useState<any>(null);

  // Set default date to today
  useEffect(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    setSelectedDate(`${yyyy}-${mm}-${dd}`);

    if (preselectedServiceId) {
      const match = INITIAL_SERVICES.find(s => s.id === preselectedServiceId);
      if (match) {
        setSelectedService(match);
      }
    } else {
      setSelectedService(INITIAL_SERVICES[0]);
    }
  }, [preselectedServiceId]);

  const timeSlots = [
    { time: "10:00 AM", available: true },
    { time: "10:30 AM", available: true },
    { time: "11:00 AM", available: true },
    { time: "11:30 AM", available: false },
    { time: "12:00 PM", available: true },
    { time: "12:30 PM", available: true },
    { time: "01:30 PM", available: true },
    { time: "02:00 PM", available: true },
    { time: "02:30 PM", available: false },
    { time: "03:00 PM", available: true },
    { time: "03:30 PM", available: true },
    { time: "04:00 PM", available: true },
    { time: "04:30 PM", available: true },
    { time: "05:00 PM", available: true },
    { time: "05:30 PM", available: true },
    { time: "06:00 PM", available: true },
    { time: "06:30 PM", available: true },
    { time: "07:00 PM", available: true },
  ];

  const handleNextStep = () => {
    if (step === 1 && !selectedService) return;
    if (step === 2 && !selectedDate) return;
    if (step === 3 && !selectedTime) return;
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !selectedService || !selectedDate || !selectedTime) return;

    setIsSubmitting(true);
    try {
      const res = await createAppointment({
        customer_name: customerName,
        customer_phone: customerPhone,
        customer_email: customerEmail,
        service_id: selectedService.id,
        service_name: selectedService.name,
        appointment_date: selectedDate,
        appointment_time: selectedTime,
        notes: notes,
      });

      if (res && res.appointment) {
        setConfirmedAppointment(res.appointment);
        setStep(5);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateWhatsAppUrl = () => {
    if (!confirmedAppointment) return "#";
    const text = `Hello Vintage Salon, I have submitted an appointment request:%0A%0A*Name:* ${confirmedAppointment.customer_name}%0A*Service:* ${confirmedAppointment.service_name}%0A*Date:* ${confirmedAppointment.appointment_date}%0A*Time:* ${confirmedAppointment.appointment_time}%0A%0APlease confirm my slot. Thank you!`;
    return `https://wa.me/${SALON_INFO.whatsapp}?text=${text}`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-vintage-ivory border border-vintage-espresso/15 shadow-2xl p-6 sm:p-12 relative overflow-hidden">
      
      {/* Step Stepper Header */}
      {step <= 4 && (
        <div className="mb-10 border-b border-vintage-espresso/10 pb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-sans font-semibold uppercase tracking-[0.2em] text-vintage-rose">
              Step 0{step} of 04
            </span>
            <span className="text-xs font-sans text-vintage-muted">
              {step === 1 && "Select Salon Service"}
              {step === 2 && "Choose Preferred Date"}
              {step === 3 && "Select Time Slot"}
              {step === 4 && "Your Details"}
            </span>
          </div>

          <div className="w-full bg-vintage-espresso/10 h-1 rounded-full overflow-hidden">
            <div
              className="bg-vintage-rose h-full transition-all duration-500 ease-out"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* STEP 1: Select Service */}
      {step === 1 && (
        <div className="space-y-6">
          <div className="text-left space-y-2">
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-vintage-espresso">
              Select Your Desired Treatment
            </h3>
            <p className="font-sans text-sm text-vintage-muted font-light">
              Choose from our bespoke hair, makeup, skin or nail service catalog.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[420px] overflow-y-auto pr-2">
            {services.map((service) => {
              const isSelected = selectedService?.id === service.id;
              return (
                <div
                  key={service.id}
                  onClick={() => setSelectedService(service)}
                  className={`p-5 border cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                    isSelected
                      ? "bg-vintage-espresso text-vintage-ivory border-vintage-espresso shadow-lg scale-[1.01]"
                      : "bg-white/80 text-vintage-espresso border-vintage-espresso/10 hover:border-vintage-rose"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="font-serif text-lg font-medium">
                      {service.name}
                    </span>
                    <span
                      className={`text-[10px] uppercase font-sans font-semibold tracking-wider px-2 py-0.5 border ${
                        isSelected
                          ? "bg-vintage-champagne text-vintage-espresso border-vintage-champagne"
                          : "bg-vintage-ivory text-vintage-muted border-vintage-espresso/10"
                      }`}
                    >
                      {service.category}
                    </span>
                  </div>

                  <p className={`text-xs font-sans font-light line-clamp-2 mb-4 ${
                    isSelected ? "text-vintage-ivory/80" : "text-vintage-muted"
                  }`}>
                    {service.description}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-current/10 text-xs">
                    <span className="font-serif font-semibold">{service.price}</span>
                    <span className="font-sans text-[11px] opacity-80">{service.duration}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-6 flex justify-end">
            <button
              onClick={handleNextStep}
              disabled={!selectedService}
              className="px-8 py-3.5 bg-vintage-espresso text-vintage-ivory text-xs font-sans font-semibold tracking-[0.2em] uppercase border border-vintage-espresso hover:bg-vintage-rose hover:border-vintage-rose transition-all flex items-center gap-2 disabled:opacity-50"
            >
              <span>Continue to Date</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Select Date */}
      {step === 2 && (
        <div className="space-y-6">
          <div className="text-left space-y-2">
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-vintage-espresso">
              Select Appointment Date
            </h3>
            <p className="font-sans text-sm text-vintage-muted font-light">
              We are open 7 days a week from 10:00 AM to 8:30 PM.
            </p>
          </div>

          <div className="bg-white/80 p-6 border border-vintage-espresso/10 max-w-md mx-auto">
            <label className="block text-xs font-sans font-medium uppercase tracking-widest text-vintage-muted mb-2">
              Appointment Date
            </label>
            <input
              type="date"
              value={selectedDate}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full p-4 border border-vintage-espresso/20 bg-vintage-ivory text-vintage-espresso font-sans text-base focus:outline-none focus:border-vintage-rose"
            />
          </div>

          <div className="pt-6 flex items-center justify-between">
            <button
              onClick={handlePrevStep}
              className="px-6 py-3 border border-vintage-espresso/20 text-vintage-espresso text-xs font-sans font-medium uppercase tracking-widest hover:bg-vintage-espresso/5 flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              onClick={handleNextStep}
              disabled={!selectedDate}
              className="px-8 py-3.5 bg-vintage-espresso text-vintage-ivory text-xs font-sans font-semibold tracking-[0.2em] uppercase border border-vintage-espresso hover:bg-vintage-rose hover:border-vintage-rose transition-all flex items-center gap-2"
            >
              <span>Select Time Slot</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Select Time Slot */}
      {step === 3 && (
        <div className="space-y-6">
          <div className="text-left space-y-2">
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-vintage-espresso">
              Choose Available Time Slot
            </h3>
            <p className="font-sans text-sm text-vintage-muted font-light">
              Selected Date: <span className="font-semibold text-vintage-espresso">{selectedDate}</span>
            </p>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 max-h-[320px] overflow-y-auto p-1">
            {timeSlots.map((slot, idx) => {
              const isSelected = selectedTime === slot.time;
              return (
                <button
                  key={idx}
                  disabled={!slot.available}
                  onClick={() => setSelectedTime(slot.time)}
                  className={`py-3 px-2 text-xs font-sans font-medium tracking-wider border transition-all ${
                    !slot.available
                      ? "opacity-30 bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed line-through"
                      : isSelected
                      ? "bg-vintage-espresso text-vintage-ivory border-vintage-espresso shadow-md"
                      : "bg-white text-vintage-espresso border-vintage-espresso/15 hover:border-vintage-rose"
                  }`}
                >
                  {slot.time}
                </button>
              );
            })}
          </div>

          <div className="pt-6 flex items-center justify-between">
            <button
              onClick={handlePrevStep}
              className="px-6 py-3 border border-vintage-espresso/20 text-vintage-espresso text-xs font-sans font-medium uppercase tracking-widest hover:bg-vintage-espresso/5 flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              onClick={handleNextStep}
              disabled={!selectedTime}
              className="px-8 py-3.5 bg-vintage-espresso text-vintage-ivory text-xs font-sans font-semibold tracking-[0.2em] uppercase border border-vintage-espresso hover:bg-vintage-rose hover:border-vintage-rose transition-all flex items-center gap-2"
            >
              <span>Customer Details</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Customer Details Form */}
      {step === 4 && (
        <form onSubmit={handleSubmitBooking} className="space-y-6 text-left">
          <div className="space-y-2">
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-vintage-espresso">
              Confirm Your Information
            </h3>
            <p className="font-sans text-sm text-vintage-muted font-light">
              Please enter your contact details so our salon coordinator can confirm your appointment.
            </p>
          </div>

          <div className="p-4 bg-white border border-vintage-champagne/40 flex flex-wrap justify-between items-center text-xs font-sans gap-2">
            <div>
              <span className="text-vintage-muted uppercase block text-[10px]">Service</span>
              <span className="font-serif font-semibold text-vintage-espresso text-sm">
                {selectedService?.name}
              </span>
            </div>
            <div>
              <span className="text-vintage-muted uppercase block text-[10px]">Date & Time</span>
              <span className="font-sans font-medium text-vintage-espresso text-sm">
                {selectedDate} @ {selectedTime}
              </span>
            </div>
            <div>
              <span className="text-vintage-muted uppercase block text-[10px]">Price</span>
              <span className="font-serif font-semibold text-vintage-rose text-sm">
                {selectedService?.price}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-sans font-medium uppercase tracking-wider text-vintage-espresso mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Priya Sharma"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full p-3.5 border border-vintage-espresso/20 bg-white text-vintage-espresso text-sm font-sans focus:outline-none focus:border-vintage-rose"
              />
            </div>

            <div>
              <label className="block text-xs font-sans font-medium uppercase tracking-wider text-vintage-espresso mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                required
                placeholder="098990 00879"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full p-3.5 border border-vintage-espresso/20 bg-white text-vintage-espresso text-sm font-sans focus:outline-none focus:border-vintage-rose"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-sans font-medium uppercase tracking-wider text-vintage-espresso mb-1">
                Email Address (Optional)
              </label>
              <input
                type="email"
                placeholder="name@example.com"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="w-full p-3.5 border border-vintage-espresso/20 bg-white text-vintage-espresso text-sm font-sans focus:outline-none focus:border-vintage-rose"
              />
            </div>

            <div>
              <label className="block text-xs font-sans font-medium uppercase tracking-wider text-vintage-espresso mb-1">
                Special Requests / Notes
              </label>
              <input
                type="text"
                placeholder="e.g. Sensitive scalp, bridal consultation"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-3.5 border border-vintage-espresso/20 bg-white text-vintage-espresso text-sm font-sans focus:outline-none focus:border-vintage-rose"
              />
            </div>
          </div>

          <div className="pt-6 flex items-center justify-between">
            <button
              type="button"
              onClick={handlePrevStep}
              className="px-6 py-3 border border-vintage-espresso/20 text-vintage-espresso text-xs font-sans font-medium uppercase tracking-widest hover:bg-vintage-espresso/5 flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3.5 bg-vintage-rose text-vintage-espresso text-xs font-sans font-semibold tracking-[0.2em] uppercase border border-vintage-rose hover:bg-vintage-espresso hover:text-vintage-ivory transition-all flex items-center gap-2 shadow-lg disabled:opacity-50"
            >
              {isSubmitting ? "Submitting Request..." : "Confirm & Send Booking"}
            </button>
          </div>
        </form>
      )}

      {/* STEP 5: Instant Confirmation Ticket Receipt */}
      {step === 5 && confirmedAppointment && (
        <div className="py-8 text-center space-y-6 animate-fade-in">
          <div className="w-16 h-16 bg-vintage-rose/20 text-vintage-rose rounded-full flex items-center justify-center mx-auto border border-vintage-rose">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-sans font-semibold tracking-[0.25em] text-vintage-champagne uppercase">
              Request Received
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-normal text-vintage-espresso">
              Appointment Request Received
            </h3>
            <p className="font-sans text-sm text-vintage-muted max-w-md mx-auto font-light">
              Thank you, <strong className="text-vintage-espresso">{confirmedAppointment.customer_name}</strong>. Your appointment request has been registered at Vintage Beauty Salon.
            </p>
          </div>

          <div className="max-w-md mx-auto bg-white border border-vintage-espresso/20 p-6 shadow-xl text-left font-sans space-y-4 relative">
            <div className="flex items-center justify-between border-b border-vintage-espresso/10 pb-4">
              <span className="font-serif text-xl font-semibold text-vintage-espresso">
                VINTAGE
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2.5 py-1 border border-emerald-200">
                Status: Pending Confirmation
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-vintage-muted uppercase block text-[10px]">Service</span>
                <span className="font-medium text-vintage-espresso">
                  {confirmedAppointment.service_name}
                </span>
              </div>
              <div>
                <span className="text-vintage-muted uppercase block text-[10px]">Date</span>
                <span className="font-medium text-vintage-espresso">
                  {confirmedAppointment.appointment_date}
                </span>
              </div>
              <div>
                <span className="text-vintage-muted uppercase block text-[10px]">Time Slot</span>
                <span className="font-medium text-vintage-espresso">
                  {confirmedAppointment.appointment_time}
                </span>
              </div>
              <div>
                <span className="text-vintage-muted uppercase block text-[10px]">Phone</span>
                <span className="font-medium text-vintage-espresso">
                  {confirmedAppointment.customer_phone}
                </span>
              </div>
            </div>

            <p className="text-[11px] text-vintage-muted italic pt-2 border-t border-vintage-espresso/10">
              We&apos;ll contact you shortly to confirm your time slot.
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={generateWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-emerald-600 text-white text-xs font-sans font-semibold tracking-wider uppercase flex items-center justify-center gap-2 hover:bg-emerald-700 transition-colors w-full sm:w-auto shadow-md"
            >
              <MessageSquare className="w-4 h-4" />
              Quick WhatsApp Confirmation
            </a>

            <button
              onClick={() => {
                setStep(1);
                setConfirmedAppointment(null);
              }}
              className="px-6 py-3.5 border border-vintage-espresso text-vintage-espresso text-xs font-sans font-semibold tracking-wider uppercase hover:bg-vintage-espresso hover:text-vintage-ivory transition-colors w-full sm:w-auto"
            >
              Book Another Treatment
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default function BookingWidget() {
  return (
    <Suspense fallback={
      <div className="w-full max-w-4xl mx-auto bg-vintage-ivory border border-vintage-espresso/15 shadow-2xl p-12 text-center font-serif text-vintage-espresso">
        Loading Booking Widget...
      </div>
    }>
      <BookingWidgetContent />
    </Suspense>
  );
}
