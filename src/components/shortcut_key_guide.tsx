const ShortcutKey = ({ children }: { children: React.ReactNode }) => (
        <span className="inline-flex items-center justify-center px-1.5 py-0.5 rounded text-[10px] font-bold text-gray-400 bg-gray-100 border border-gray-200 ml-1.5 mr-0.5">
                {children}
        </span>
);

export default ShortcutKey;