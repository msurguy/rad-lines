export default {
  customShape: `<h6> Custom SVG Path</h6><p>You can use contents of SVG path's d="" attribute to create a base shape</p><p>Examples</p>
   <ul class="pl-3">
              <li>M2,2 L8,2 L2,5 L8,5 L2,8 L8,8</li>
              <li>M2,5 S2,-2 4,5 S7,8 8,4</li>
              <li>M140 20C73 20 20 74 20 140c0 135 136 170 228 303 88-132 229-173 229-303 0-66-54-120-120-120-48 0-90 28-109 69-19-41-60-69-108-69z</li>
              <li>M 8,223 c 0,0 143,3 185,-181 c 2,-11 -1,-20 1,-33 h 16 c 0,0 -3,17 1,30 c 21,68 -4,242 -204,196 L 8,223 z M 8,230 c 0,0 188,40 196,-160</li>
            </ul>
  `,
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
