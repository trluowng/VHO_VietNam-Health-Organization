import { Link } from 'react-router-dom'
import {
  Cross, Stethoscope, Watch, Quiz, Calendar, Phone, ArrowRight, Shield,
  Sparkle, Clock, Check, Heart, Smile, Leaf, Pulse, Chat,
} from '../components/icons.jsx'

const FEATURES = [
  {
    icon: <Stethoscope />,
    title: 'Tư vấn triệu chứng AI',
    desc: 'Mô tả triệu chứng bằng lời nói tự nhiên — Yên hỏi thêm khi cần, rồi đưa ra hướng xử trí kèm độ chắc chắn.',
    status: 'Đã có',
  },
  {
    icon: <Watch />,
    title: 'Giám sát sinh hiệu real-time',
    desc: 'Theo dõi nhịp tim, chỉ số cơ thể mỗi ngày từ đồng hồ đeo tay, lưu thành nhật ký theo từng thời điểm.',
    status: 'Sắp ra mắt',
  },
  {
    icon: <Quiz />,
    title: 'Quiz sơ cứu khẩn cấp',
    desc: 'Học cách xử trí tại chỗ cho vài tình huống khẩn cấp thường gặp — ngất xỉu, chảy máu, hóc dị vật...',
    status: 'Sắp ra mắt',
  },
  {
    icon: <Calendar />,
    title: 'Lịch theo dõi sức khỏe',
    desc: 'Ghi nhận đo lường định kỳ theo thời gian; tài khoản nữ có thêm mục theo dõi chu kỳ kinh nguyệt riêng.',
    status: 'Đã có',
  },
]

export default function LandingPage() {
  return (
    <div className="landing">
      <div className="atmos">
        <div className="atmos__grain" />
        <div className="atmos__veil" />
      </div>

      <header className="landing__nav">
        <div className="brand">
          <div className="brand__mark"><Cross /></div>
          <div>
            <div className="brand__name">Yên<em> · sức khỏe</em></div>
            <div className="brand__sub">AI Y tế cá nhân</div>
          </div>
        </div>
        <nav className="landing__nav-actions">
          <Link to="/dang-nhap" className="btn btn--ghost">Đăng nhập</Link>
          <Link to="/dang-ky" className="btn btn--primary">Bắt đầu miễn phí</Link>
        </nav>
      </header>

      <main className="landing__hero landing__hero--split">
        <div className="hero__copy">
          <span className="hero__eyebrow">TRỢ LÝ Y TẾ AI CÁ NHÂN</span>
          <h1 className="landing__title">
            Chăm sóc sức khỏe <em>chủ động</em>, có mặt mọi lúc bạn cần
          </h1>
          <p className="landing__lede">
            Yên tư vấn triệu chứng bằng hội thoại tự nhiên, ghi nhớ hồ sơ sức khỏe của riêng
            bạn để không phải hỏi lại từ đầu mỗi lần, và luôn ưu tiên tính mạng — phát hiện
            dấu hiệu khẩn cấp là hướng dẫn gọi 115 ngay lập tức.
          </p>
          <div className="landing__cta-row">
            <Link to="/dang-ky" className="btn btn--primary btn--lg">
              <Sparkle width={15} height={15} /> Tạo tài khoản miễn phí <ArrowRight width={17} height={17} />
            </Link>
            <Link to="/dang-nhap" className="btn btn--ghost btn--lg">
              <Clock width={16} height={16} /> Tôi đã có tài khoản
            </Link>
          </div>
          <div className="trust-row">
            <span><Shield width={15} height={15} /> Bảo mật tuyệt đối</span>
            <span><Check width={15} height={15} /> Dễ sử dụng</span>
            <span><Heart width={15} height={15} /> Đồng hành tin cậy</span>
          </div>
        </div>

        <div className="hero-illustration" aria-hidden="true">
          <div className="hero-illustration__blob" />
          <div className="hero-illustration__leaves">
            <span className="leaf-wrap leaf-wrap--1"><Leaf className="leaf" /></span>
            <span className="leaf-wrap leaf-wrap--2"><Leaf className="leaf" /></span>
            <span className="leaf-wrap leaf-wrap--3 is-flipped"><Leaf className="leaf" /></span>
          </div>
          <div className="hero-illustration__card">
            <div className="hero-illustration__avatar"><Smile width={20} height={20} /></div>
            <div>
              <p className="hero-illustration__card-title">Xin chào, tôi là Yên</p>
              <p className="hero-illustration__card-sub">Tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn 24/7</p>
            </div>
            <Heart className="hero-illustration__card-heart" width={15} height={15} />
          </div>
          <div className="hero-illustration__chips">
            <span><Pulse width={18} height={18} /></span>
            <span><Shield width={18} height={18} /></span>
            <span><Chat width={18} height={18} /></span>
          </div>
        </div>
      </main>

      <section className="landing__features">
        {FEATURES.map((f) => (
          <div className="feature-card" key={f.title}>
            <div className="feature-card__top">
              <div className="feature-card__icon">{f.icon}</div>
              <span className={`feature-card__status ${f.status === 'Đã có' ? 'is-live' : ''}`}>
                {f.status}
              </span>
            </div>
            <h3 className="feature-card__title">{f.title}</h3>
            <p className="feature-card__desc">{f.desc}</p>
            <span className="feature-card__arrow"><ArrowRight width={15} height={15} /></span>
          </div>
        ))}
      </section>

      <section className="landing__banner">
        <Phone />
        <p>Khi phát hiện dấu hiệu khẩn cấp (đau ngực dữ dội, khó thở, đột quỵ...), Yên bỏ qua mọi bước hỏi đáp và hướng dẫn gọi <strong>115</strong> ngay lập tức.</p>
      </section>

      <footer className="landing__footer">
        <div className="disclaimer" style={{ maxWidth: 680, margin: '0 auto' }}>
          <Shield />
          <span>
            Yên là công cụ hỗ trợ phân loại mức độ khẩn cấp, <strong>không thay thế chẩn đoán y khoa</strong>.
            Khi nghi ngờ, hãy liên hệ nhân viên y tế.
          </span>
        </div>
      </footer>
    </div>
  )
}
