import { costs } from "../site";

export function Costs() {
  return (
    <article className="stack tight">
      <header className="page-head">
        <h1>Cost breakdown</h1>
      </header>

      <section className="panel">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>What</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {costs.lines.map((line) => (
                <tr key={line.item}>
                  <td>
                    {line.item}
                    {line.note ? <p className="fine">{line.note}</p> : null}
                  </td>
                  <td>{line.estimate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="fine">
          pls pls plssss text mara if you have questions or concerns!!!!
        </p>
      </section>
    </article>
  );
}
