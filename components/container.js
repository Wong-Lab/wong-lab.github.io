
export default function Container({ className, ...props }) {
    return (
        <main className={`relative px-4 sm:px-14 pt-[60px] pb-14 max-w-[1920px] ${className || ''}`} {...props} />
    )
}
