import { useAuth } from '../context/AuthContext.jsx'
import { Cross, User, Phone } from '../components/icons.jsx'
import TabNav from '../components/TabNav.jsx'
import EditableTagList from '../components/EditableTagList.jsx'
import ProfileSidebar from '../components/ProfileSidebar.jsx'
import ProfileInfoCard from '../components/ProfileInfoCard.jsx'

const GENDER_OPTIONS = [
  { value: 'nu', label: 'Nữ' },
  { value: 'nam', label: 'Nam' },
]

const PERSONAL_FIELDS = [
  { key: 'full_name', label: 'Họ và tên', placeholder: 'vd: Nguyễn Minh An' },
  { key: 'birth_date', label: 'Ngày sinh', type: 'date' },
  { key: 'gender', label: 'Giới tính', type: 'select', options: GENDER_OPTIONS, format: (v) => GENDER_OPTIONS.find((g) => g.value === v)?.label || '—' },
  { key: 'phone', label: 'Số điện thoại', type: 'tel', placeholder: 'vd: 0901 234 567' },
  { key: 'address', label: 'Địa chỉ', placeholder: 'vd: 123 Đường Lê Lợi, Q.1, TP.HCM' },
  { key: 'occupation', label: 'Nghề nghiệp', placeholder: 'vd: Nhân viên văn phòng' },
  { key: 'blood_type', label: 'Nhóm máu', placeholder: 'vd: O+' },
  { key: 'insurance_status', label: 'Bảo hiểm y tế', placeholder: 'vd: Có hiệu lực' },
  { key: 'insurance_number', label: 'Mã số BHYT', placeholder: 'vd: HT1234567890' },
]

const EMERGENCY_FIELDS = [
  { key: 'emergency_contact_name', label: 'Họ và tên', placeholder: 'vd: Trần Thị Lan' },
  { key: 'emergency_contact_relationship', label: 'Mối quan hệ', placeholder: 'vd: Mẹ' },
  { key: 'emergency_contact_phone', label: 'Số điện thoại', type: 'tel', placeholder: 'vd: 0912 345 678' },
]

export default function ProfilePage() {
  const { user, profile, updateProfile } = useAuth()

  async function save(updates) {
    // age phải là số nguyên nếu đổi giới tính đi kèm form khác cập nhật riêng —
    // ở đây chỉ các trường text/select nên gửi thẳng object con.
    await updateProfile(updates)
  }

  async function updateList(key, values) {
    await updateProfile({ [key]: values })
  }

  return (
    <>
      <div className="atmos">
        <div className="atmos__grain" />
        <div className="atmos__veil" />
      </div>

      <div className="shell">
        <header className="topbar">
          <div className="brand">
            <div className="brand__mark"><Cross /></div>
            <div>
              <div className="brand__name">Yên<em> · sức khỏe</em></div>
              <div className="brand__sub">Hồ sơ của bạn</div>
            </div>
          </div>
          <TabNav />
        </header>

        <div className="calendar-page__body">
          <div className="profile-layout">
            <ProfileSidebar user={user} profile={profile || {}} />

            <div className="profile-main">
              <ProfileInfoCard
                icon={User}
                title="Thông tin cá nhân"
                fields={PERSONAL_FIELDS}
                values={profile || {}}
                onSave={save}
              />

              <div className="profile-main__row">
                <EditableTagList
                  label="Tiền sử bệnh"
                  values={profile?.chronic_conditions || []}
                  onChange={(v) => updateList('chronic_conditions', v)}
                  placeholder="vd: tăng huyết áp"
                />
                <EditableTagList
                  label="Dị ứng"
                  values={profile?.allergies || []}
                  onChange={(v) => updateList('allergies', v)}
                  placeholder="vd: penicillin"
                  tone="danger"
                />
              </div>

              <div id="emergency-contact">
                <ProfileInfoCard
                  icon={Phone}
                  title="Người liên hệ khẩn cấp"
                  fields={EMERGENCY_FIELDS}
                  values={profile || {}}
                  onSave={save}
                />
              </div>

              <section className="panel">
                <p className="panel__label" style={{ margin: '0 0 14px' }}>Tài khoản</p>
                <dl className="profile-facts">
                  <div><dt>Email</dt><dd>{user?.email}</dd></div>
                </dl>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
