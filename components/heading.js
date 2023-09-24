
export const H1 = ({ children, ...props }) => (
    <h1 className='font-sans text-2xl' {...props}>{children}</h1>
)

export const H2 = ({ children, ...props }) => (
    <h1 className='font-sans text-xl' {...props}>{children}</h1>
)

export const H3 = ({ children, ...props }) => (
    <h1 className='font-sans text-lg' {...props}>{children}</h1>
)

export default {
    H1, H2, H3
}
