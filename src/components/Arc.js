export class Arc {
  constructor(Nod1, Nod2) {
    this.Nod1 = Nod1;
    this.Nod2 = Nod2;
  }
}

export const Line = ({ myArc, orientat }) => {
  const x_A = myArc.Nod1.point.x;
  const x_B = myArc.Nod2.point.x;
  const y_A = myArc.Nod1.point.y;
  const y_B = myArc.Nod2.point.y;
  const Line_height =
    Math.sqrt(Math.pow(x_B - x_A, 2) + Math.pow(y_B - y_A, 2)) - 110;
  const c1 = Math.sqrt(Math.pow(y_B - y_A, 2));
  const c2 = Math.sqrt(Math.pow(x_B - x_A, 2));
  let semnU = -1;
  let dir = Math.PI;
  if (x_A > x_B) semnU *= -1;
  y_A > y_B ? (semnU *= -1) : (dir = 0);
  const unghi = Math.atan(c2 / c1) * semnU + dir;
  const mystyle = {
    width: 5,
    height: Line_height,
    left: (x_A + x_B) / 2,
    top: (y_A + y_B) / 2 - Line_height / 2,
    rotate: unghi + "rad",
  };
  return (
    <div className={orientat ? "Line LineO" : "Line"} style={mystyle}></div>
  );
};
