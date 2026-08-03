type Props = {
  submission: any;
};

export default function SubmissionCard({ submission }: Props) {
  return (
    <div className="border rounded-2xl p-5 bg-slate-50">
      <div className="font-semibold">{submission.student}</div>

      <p className="mt-2 whitespace-pre-wrap">{submission.contenido_texto}</p>

      <div className="mt-3 text-xs text-slate-500">
        {new Date(submission.created_at).toLocaleString()}
      </div>
    </div>
  );
}
