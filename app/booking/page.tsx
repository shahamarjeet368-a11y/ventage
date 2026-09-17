import BookingWidget from "@/components/booking/BookingWidget";

export const metadata = {
  title: "Book Appointment Online | Vintage Beauty Salon Pitampura Delhi",
  description: "Reserve your hair, makeup, nail or skin care appointment with Vintage Beauty Salon in Sant Nagar, Rani Bagh, Pitampura, Delhi. Instant slot booking.",
};

export default function BookingPage() {
  return (
    <div className="pt-28 bg-vintage-ivory pb-24">
      <div className="bg-vintage-espresso text-vintage-ivory py-20 px-6 md:px-12 text-center border-b border-vintage-champagne/20 mb-16">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-xs font-sans font-medium tracking-[0.3em] uppercase text-vintage-champagne">
            Frictionless 5-Step Scheduling
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-normal text-vintage-ivory">
            Book Your Appointment
          </h1>
          <p className="font-sans text-base text-vintage-ivory/80 max-w-xl mx-auto font-light">
            Select treatment, date, and time slot. Instant confirmation for your visit to Vintage Salon in Pitampura.
          </p>
        </div>
      </div>

      <div className="px-6 md:px-12">
        <BookingWidget />
      </div>
    </div>
  );
}
