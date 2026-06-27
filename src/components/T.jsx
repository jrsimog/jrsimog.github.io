import { useLanguage } from '../context/LanguageContext'

const T = ({ id, as: Tag = 'span', className = '', children }) => {
  const { t, isChanging } = useLanguage()
  const cls = `lang-t${isChanging ? ' lang-t-out' : ''}${className ? ` ${className}` : ''}`
  return <Tag className={cls}>{id ? t(id) : children}</Tag>
}

export default T
