import Sidebar from '@/components/Sidebar'

type LayoutProps = {
    children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
    return (
        <>
            <Sidebar>
                {children}
            </Sidebar>
        </>
    )
}