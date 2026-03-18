import { useEffect, useState, type SyntheticEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppLayout } from '../components/layout/AppLayout'
import { StatusBanner } from '../components/StatusBanner'
import { useStatus } from '../hooks/useStatus'
import {
    createParent,
    updateParent,
    getParentById,
} from '../services/parentsApi'

const emptyParent = { name: '', phone: '', email: '' }

export const ParentFormPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { status, setStatus, clearStatus } = useStatus()

    const [form, setForm] = useState(emptyParent)
    const isEdit = !!id

    useEffect(() => {
        if (isEdit && id) {
            getParentById(id)
                .then(setForm)
                .catch((error) => {
                    setStatus({
                        type: 'error',
                        message:
                            (error as Error).message ?? 'Không thể tải phụ huynh',
                    })
                })
        }
    }, [id, isEdit, setStatus])

    const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        clearStatus()

        try {
            if (isEdit && id) {
                await updateParent(id, form)
            } else {
                await createParent(form)
            }

            setStatus({ type: 'success', message: 'Lưu phụ huynh thành công' })
            navigate('/parents')
        } catch (error) {
            setStatus({
                type: 'error',
                message: (error as Error).message ?? 'Lưu phụ huynh thất bại',
            })
        }
    }

    return (
        <AppLayout title={isEdit ? 'Chỉnh sửa phụ huynh' : 'Tạo phụ huynh mới'}>
            <StatusBanner status={status} />
            <section className="card">
                <form className="form" onSubmit={handleSubmit}>
                    <label>Họ tên</label>
                    <input
                        value={form.name}
                        onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                        }
                    />

                    <label>Phone</label>
                    <input
                        value={form.phone}
                        onChange={(e) =>
                            setForm({ ...form, phone: e.target.value })
                        }
                    />

                    <label>Email</label>
                    <input
                        value={form.email}
                        onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                        }
                    />

                    <button type="submit">
                        {isEdit ? 'Cập nhật' : 'Tạo mới'}
                    </button>
                </form>
            </section>
        </AppLayout>
    )
}