interface FilterButtonProps {
    openModal: () => void;
}

export default function FilterButton({ openModal }: FilterButtonProps) {
    return (
        <button
            onClick={openModal}
            className="bg-LightGreen flex h-[44px] min-w-[200px] items-center justify-center gap-4 rounded-lg px-4 text-sm font-medium text-[#FFFFFF]"
        >
            Filter
        </button>
    );
}
