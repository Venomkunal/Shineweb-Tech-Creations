import {
ArrowDownRight,
ArrowUpRight,
Clock3,
Mail,
MapPin,
MessageCircle,
Phone,
ShieldCheck,
Sparkles,
} from "lucide-react";

import styles from "./ContactChannels.module.css";

const CONTACT = {
phoneDisplay: "+91 93659 63310",
phoneLink: "tel:+919365963310",
email: "support@shinewebtechcretions.online",
whatsapp:
"https://wa.me/917099093224?text=" +
encodeURIComponent(
"Hello Shineweb Tech Creations! I would like to discuss a project."
),
maps:
"https://www.google.com/maps/search/?api=1&query=" +
encodeURIComponent("Guwahati, Assam, India"),
};

const channels = [
{
id: "phone",
icon: Phone,
label: "GIVE US A CALL",
title: CONTACT.phoneDisplay,
description:
"Speak with our team about your project, technical requirements, or business needs.",
href: CONTACT.phoneLink,
action: "Call our team",
detail: "Direct phone contact",
featured: true,
},
{
id: "email",
icon: Mail,
label: "SEND AN EMAIL",
title: "Email our team",
description:
"Send us your project brief, quotation request, or technical support enquiry.",
href: "mailto:${CONTACT.email}",
action: "Write an email",
detail: CONTACT.email,
featured: false,
},
{
id: "whatsapp",
icon: MessageCircle,
label: "CHAT WITH US",
title: "WhatsApp",
description:
"Start a conversation and tell us what you want to build or improve.",
href: CONTACT.whatsapp,
action: "Start a conversation",
detail: "Quick project enquiries",
featured: false,
},
{
id: "location",
icon: MapPin,
label: "OUR LOCATION",
title: "Guwahati, Assam",
description:
"Connect with a technology partner serving businesses in Assam and across India.",
href: CONTACT.maps,
action: "Explore on Maps",
detail: "Assam, India",
featured: false,
},
];

export default function ContactChannels() {
return (
<section
id="contact-channels"
className={styles.channelsSection}
aria-labelledby="channels-title"
>
<div className={styles.sectionContainer}>
{/* Section heading */}
<div className={styles.sectionHeading}>
<span className={styles.eyebrow}>
<Sparkles size={14} />
GET IN TOUCH
</span>

      <h2 id="channels-title">
        Let&apos;s connect.
        <br />
        <span>We&apos;re here to help.</span>
      </h2>

      <p>
        Have a project in mind or need expert technical guidance?
        Choose your preferred way to reach Shineweb Tech Creations.
      </p>
    </div>

    {/* Contact cards */}
    <div className={styles.channelGrid}>
      {channels.map((channel, index) => {
        const Icon = channel.icon;
        const isExternal = channel.href.startsWith("https://");

        return (
          <a
            key={channel.id}
            href={channel.href}
            className={[
              styles.channelCard,
              channel.featured ? styles.featuredCard : "",
            ]
              .filter(Boolean)
              .join(" ")}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            aria-label={`${channel.action}: ${channel.title}`}
            style={
              {
                "--card-index": index,
              } as React.CSSProperties
            }
          >
            <div className={styles.channelTop}>
              <span className={styles.channelIcon}>
                <Icon size={21} strokeWidth={1.8} />
              </span>

              <span className={styles.cardArrow}>
                <ArrowUpRight size={18} />
              </span>
            </div>

            <span className={styles.channelLabel}>
              {channel.label}
            </span>

            <h3>{channel.title}</h3>

            <p className={styles.channelDescription}>
              {channel.description}
            </p>

            <div className={styles.cardFooter}>
              <span className={styles.channelAction}>
                {channel.action}
                <ArrowUpRight size={15} />
              </span>
            </div>

            <span className={styles.cardIndex} aria-hidden="true">
              0{index + 1}
            </span>
          </a>
        );
      })}
    </div>

    {/* Business hours */}
    <div className={styles.hoursBar}>
      <div className={styles.hoursIcon}>
        <Clock3 size={20} />
      </div>

      <div className={styles.hoursContent}>
        <span className={styles.hoursEyebrow}>
          WHEN TO REACH US
        </span>

        <strong>Business hours</strong>

        <span className={styles.hoursText}>
          Monday – Saturday
          <span className={styles.hoursSeparator}>·</span>
          9:00 AM – 6:00 PM IST
        </span>
      </div>

      <div className={styles.timezoneBadge}>
        <span className={styles.timezoneDot} />
        <span>UTC +5:30</span>
      </div>

      <ArrowDownRight
        size={21}
        className={styles.hoursArrow}
        aria-hidden="true"
      />
    </div>

    {/* Reassurance note */}
    <div className={styles.contactNote}>
      <ShieldCheck size={17} />

      <p>
        <strong>Every project starts with a conversation.</strong>
        Tell us what you need, and we&apos;ll discuss the next steps.
      </p>
    </div>
  </div>
</section>

);
}