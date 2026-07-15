import { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { Cross } from '../components/icons.jsx'
import TabNav from '../components/TabNav.jsx'
import EditableTagList from '../components/EditableTagList.jsx'

const GENDERS = [
  { value: 'nu', label: 'Nữ' },
  { value: 'nam', label: 'Nam' },
]

function formatDate(iso) {
  if (!iso) return '—'
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return '—'
  return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

export default function ProfilePage() {
  const { user, profile, isFemale, updateProfile } = useAuth()
  const [age, setAge] = useState(profile?.age ?? '')
  const [gender, setGender] = useState(profile?.gender ?? '')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState(null)
  const [saved, setSaved] = useState(false)

  const dirty = String(age) !== String(profile?.age ?? '') || gender !== (profile?.gender ?? '')

  async function saveBasics(e) {
    e.preventDefault()
    const ageNum = Number(age)
    if (!Number.isInteger(ageNum) || ageNum <= 0 || ageNum >= 120) {
      setError('Tuổi không hợp lệ.')
      return
    }
    setBusy(true)
    setError(null)
    setSaved(false)
    try {
      await updateProfile({ age: ageNum, gender })
      setSaved(true)
    } catch (err) {
      setError(err.message || 'Không lưu được, thử lại nhé.')
    } finally {
      setBusy(false)
    }
  }

  async function updateList(key, values) {
    setBusy(true)
    try {
      await updateProfile({ [key]: values })
    } finally {
      setBusy(false)
    }
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
          <div className="profile-grid">
            <section className="panel">
              <p className="panel__label" style={{ margin: '0 0 14px' }}>Tài khoản</p>
              <dl className="profile-facts">
                <div><dt>Email</dt><dd>{user?.email}</dd></div>
                <div><dt>Ngày tạo tài khoản</dt><dd>{formatDate(user?.created_at)}</dd></div>
                <div><dt>Hồ sơ cập nhật lần cuối</dt><dd>{formatDate(profile?.updated_at)}</dd></div>
              </dl>
            </section>

            <section className="panel">
              <p className="panel__label" style={{ margin: '0 0 14px' }}>Thông tin cá nhân</p>
              <form className="profile-basics-form" onSubmit={saveBasics}>
                <label className="auth-field">
                  <span>Tuổi</span>
                  <input
                    type="number"
                    min={1}
                    max={119}
                    value={age}
                    onChange={(e) => { setAge(e.target.value); setSaved(false) }}
                    required
                  />
                </label>
                <div className="auth-field">
                  <span>Giới tính</span>
                  <div className="gender-picker">
                    {GENDERS.map((g) => (
                      <button
                        type="button"
                        key={g.value}
                        className={`gender-chip ${gender === g.value ? 'is-active' : ''}`}
                        onClick={() => { setGender(g.value); setSaved(false) }}
                      >
                        {g.label}
                      </button>
                    ))}
                  </div>
                  {isFemale && (
                    <p className="auth-field__hint">
                      Tài khoản nữ có thêm tab theo dõi chu kỳ kinh nguyệt trong mục Lịch.
                    </p>
                  )}
                </div>
                {error && <p className="auth-error">{error}</p>}
                <button className="btn btn--primary" type="submit" disabled={busy || !dirty}>
                  {busy ? 'Đang lưu…' : saved ? 'Đã lưu' : 'Lưu thay đổi'}
                </button>
              </form>
            </section>

            <EditableTagList
              label="Bệnh nền"
              values={profile?.chronic_conditions || []}
              onChange={(v) => updateList('chronic_conditions', v)}
              placeholder="vd: tiểu đường"
              busy={busy}
            />
            <EditableTagList
              label="Dị ứng"
              values={profile?.allergies || []}
              onChange={(v) => updateList('allergies', v)}
              placeholder="vd: penicillin"
              busy={busy}
            />
            <EditableTagList
              label="Thuốc đang dùng"
              values={profile?.medications || []}
              onChange={(v) => updateList('medications', v)}
              placeholder="vd: metformin"
              busy={busy}
            />
          </div>
        </div>
      </div>
    </>
  )
}
