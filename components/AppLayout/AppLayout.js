export const AppLayout = ({ children }) => {
    return (
        <div className="grid grid-cols-[300px_1fr] h-screen max-h-screen">
            <div className="flex flex-col overflow-hidden ">
                This is the AppLayout component.
            </div>
            <div className="bg-gray-100">
                {children}
            </div>
        </div>
    )
}