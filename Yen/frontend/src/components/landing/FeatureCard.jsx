import { ArrowRight } from 'lucide-react'

export default function FeatureCard({ icon: Icon, iconBg, iconColor, status, title, desc }) {
  return (
    <div className="group relative flex h-full flex-col rounded-[26px] border border-skytint-border bg-white p-6 shadow-[0_2px_10px_rgba(16,42,92,0.05)] transition duration-200 hover:-translate-y-1 hover:border-cyan/40 hover:shadow-[0_16px_34px_rgba(16,42,92,0.12)]">
      <div className="flex items-center justify-between">
        <span className={`flex h-12 w-12 items-center justify-center rounded-[14px] ${iconBg}`}>
          <Icon className={`h-6 w-6 ${iconColor}`} strokeWidth={2} />
        </span>
        <span
          className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.08em] ${
            status === 'Đã có' ? 'bg-statusgreen-bg text-statusgreen' : 'bg-slate-100 text-slate-text'
          }`}
        >
          {status}
        </span>
      </div>
      <h3 className="mt-5 font-serif text-[18px] font-medium text-navy">{title}</h3>
      <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-slate-text">{desc}</p>
      <span className="mt-4 flex h-8 w-8 items-center justify-center self-end rounded-full bg-skytint-bg text-cyan transition duration-200 group-hover:translate-x-0.5 group-hover:bg-gradient-to-br group-hover:from-teal group-hover:to-teal-deep group-hover:text-white">
        <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
      </span>
    </div>
  )
}
