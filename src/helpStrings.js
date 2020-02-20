export default {
  width: `<h6> SVG stroke width</h6><p>You can use SVG width units to specify stroke width</p> <p>Examples:</p>
            <ul class="pl-3">
              <li>1px</li>
              <li>0.4mm</li>
              <li>2pt</li>
              <li>0.01in</li>
              <li>1mm</li>
            </ul>`,
  operatorsHelp: `<h6>Formula Field</h6>
            <p>In this field, <code>i</code> represents the current loop iteration. You can use the following:</p>
            <p>
            Operators:<code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>, <code>%</code>, <code>mod</code><br>
            Arithmetic:<code>abs</code>, <code>exp</code>, <code>log</code>, <code>sqrt</code>, <code>ceil</code>, <code>floor</code>, <code>random</code>, <code>round</code><br>
            Trigonometry:<code>tan</code>, <code>sin</code>, <code>cos</code>, <code>acos</code>, <code>asin</code>, <code>atan</code>, <code>atan2</code><br>
            Statistics:<code>max</code>, <code>min</code><br>
            Constants:<code>pi</code>, <code>e</code></p>
            <p>Examples:</p>
            <ul class="pl-3">
              <li>
                <code>
                  i*20 + sin(i)*random()*100
                </code>
              </li>
              <li>
                <code>
                  10i+sin(10i)*pi
                </code>
              </li>
            </ul>`
}
