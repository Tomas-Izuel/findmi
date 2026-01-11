export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex items-center justify-center px-4 -mt-14">
            {/* Background gradient - neon green */}
            <div className="fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute top-1/4 -left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
                <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
            </div>

            <div className="w-full max-w-sm">{children}</div>
        </div>
    );
}
