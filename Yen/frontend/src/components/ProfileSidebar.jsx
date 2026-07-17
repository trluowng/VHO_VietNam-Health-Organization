import { User, Droplet, Shield, Calendar as CalendarIcon, Camera } from './icons.jsx'

const GENDER_LABEL = { nu: 'Nữ', nam: 'Nam' }

function formatDate(iso) {
  if (!iso) return '—'
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return '—'
  return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

export default function ProfileSidebar({ user, profile }) {
  const displayName = profile?.full_name || user?.email || 'Bạn'
  const ageGender = [profile?.age ? `${profile.age} tuổi` : null, GENDER_LABEL[profile?.gender]]
    .filter(Boolean)
    .join(' · ')

  return (
    <aside className="profile-sidebar panel">
      <div className="profile-sidebar__avatar-wrap">
        <div className="profile-sidebar__avatar"><User width={48} height={48} /></div>
        <button type="button" className="profile-sidebar__avatar-btn" title="Đổi ảnh đại diện (sắp ra mắt)" disabled>
          <Camera width={14} height={14} />
        </button>
      </div>
      <p className="profile-sidebar__name">{displayName}</p>
      {ageGender && <p className="profile-sidebar__meta">{ageGender}</p>}

      <div className="profile-sidebar__rows">
        <div className="profile-sidebar__row">
          <span className="profile-sidebar__row-icon"><Droplet width={15} height={15} /></span>
          <span>Nhóm máu</span>
          <strong>{profile?.blood_type || '—'}</strong>
        </div>
        <div className="profile-sidebar__row">
          <span className="profile-sidebar__row-icon"><Shield width={15} height={15} /></span>
          <span>Bảo hiểm y tế</span>
          <strong>{profile?.insurance_status || 'Chưa cập nhật'}</strong>
        </div>
        {profile?.insurance_number && (
          <div className="profile-sidebar__row profile-sidebar__row--sub">
            <span />
            <span>Mã số</span>
            <strong>{profile.insurance_number}</strong>
          </div>
        )}
        <div className="profile-sidebar__row">
          <span className="profile-sidebar__row-icon"><CalendarIcon width={15} height={15} /></span>
          <span>Ngày tham gia</span>
          <strong>{formatDate(user?.created_at)}</strong>
        </div>
      </div>

      <button
        type="button"
        className="btn btn--ghost profile-sidebar__emergency-btn"
        onClick={() => document.getElementById('emergency-contact')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
      >
        <User width={15} height={15} /> Người liên hệ khẩn cấp
      </button>

      <div className="profile-sidebar__trust">
        <Shield width={16} height={16} />
        <div>
          <strong>Hồ sơ sức khỏe của bạn</strong>
          <p>Thông tin chỉ dùng để cá nhân hoá tư vấn — không chia sẻ cho bên thứ ba.</p>
        </div>
      </div>
    </aside>
  )
}
