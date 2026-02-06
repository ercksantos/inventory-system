function Table({ columns, data, emptyMessage = "Nenhum registro encontrado" }) {
  return (
    <>
      <div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-8 text-center text-gray-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-50 transition-colors">
                  {columns.map((column, colIndex) => (
                    <td key={colIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {column.render ? column.render(row) : row[column.accessor]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-4">
        {data.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
            {emptyMessage}
          </div>
        ) : (
          data.map((row, rowIndex) => (
            <div key={rowIndex} className="bg-white rounded-lg shadow p-4 space-y-3">
              {columns.map((column, colIndex) => (
                <div key={colIndex} className="flex justify-between items-start gap-2">
                  <span className="text-xs font-medium text-gray-500 uppercase">
                    {column.header}
                  </span>
                  <span className="text-sm text-gray-900 text-right">
                    {column.render ? column.render(row) : row[column.accessor]}
                  </span>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default Table;
