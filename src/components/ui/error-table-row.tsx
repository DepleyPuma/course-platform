function ErrorTableRow({
  colSpan,
  children,
}: {
  colSpan: number;
  children: React.ReactNode;
}) {
  return (
    <tr>
      <td colSpan={colSpan} className="p-3 text-red-500">
        {children}
      </td>
    </tr>
  );
}

export { ErrorTableRow };
