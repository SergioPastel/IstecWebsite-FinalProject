export default function PageCard({ page, onEdit, onDelete }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-bold text-slate-900">{page.title}</h3>
        <span className="text-xs font-mono text-slate-400 bg-slate-50 px-2 py-1 rounded">
          {/* UUIDs are long, so we just show the start */}
          ID: {page.id}
        </span>
      </div>

      <div className="text-sm text-[#0d8fe8] font-medium mb-4">
        /{page.slug}
      </div>

      <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
        <div className="bg-blue-50 text-blue-600 px-2 py-1 rounded-md font-bold">
          {/* Use the count from withCount() */}
          {page.sections_count} Sections
        </div>
        <span>•</span>
        <span>Updated {new Date(page.updated_at).toLocaleDateString()}</span>
      </div>

      <div className="flex gap-4 border-t pt-4">
        <button
          onClick={() => onEdit(page.id)}
          className="text-sm font-bold text-slate-700 hover:text-[#0d8fe8]"
        >
          Manage
        </button>
        <button
          onClick={() => onDelete(page.id)}
          className="text-sm font-bold text-red-400 hover:text-red-600 ml-auto"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
