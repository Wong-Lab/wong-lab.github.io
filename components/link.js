import NextLink from 'next/link'

export default function Link(props) {
    return (
        <NextLink className="underline hover:decoration-2 text-sky-900 visited:text-sky-900 dark:text-[#84c9f2]" {...props} />
    )
}

