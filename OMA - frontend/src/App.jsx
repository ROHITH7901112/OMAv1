import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div class="title">
        <h1>HARTS OMA - Organizational Maturity Model</h1>
        <h3>Measure. Improve. Transform</h3>
        <p>Understand your organization’s current maturity level, identify gaps, and build a <br />clear roadmap for sustainable growth using data-driven insights.</p>
        <div class="start-req">
          <button id='start'>Start Assessment</button>
          <button id='request'>Request Demo</button>
        </div>
      </div>

      <div class="wh-om">
          <h2>What is OMA?</h2>
          <hr />
          <p>OMA(Organizational Maturity Assessment) is a structured evaluation framework that helps organization assess their capabilities across key business dimensions.</p>
          <h2>Why OMA?</h2>
          <hr />
          <p>Organizations grow faster and stronger when decision are based on clarity - not assumption. OMA helps leadership teams understand where they stand today and what to prioritize next.</p>
      </div>

      <div class="desc">
        <div class="sub-topic">
          <h2>Key Benefits</h2>
          <hr />
        </div>
        <div class="ke-be">
          <div>
            <img src="src/assets/key_benefits/isg.png" alt="abc" width="80px" height="80px"/>
            <p>Identify strength & gaps</p>
          </div>

          <div>
            <img src="src/assets/key_benefits/ddd.png" alt="" width="80px" height="80px"/>
            <p>Data driven decisions</p>
          </div>

          <div>
            <img src="src/assets/key_benefits/ua.png" alt="" width="80px" height="80px"/>
            <p>Unbiased assessment</p>
          </div>

          <div>
            <img src="src/assets/key_benefits/ar.png" alt="does not find image" width="80px" height="80px"/>
            <p>Actionable roadmap</p>
          </div>

          <div>
            <img src="src/assets/key_benefits/sg.png" alt="" width="80px" height="80px"/>
            <p>Scalable Growth</p>
          </div>

        </div>
        <div class="sub-topic">
          <h2>Assessment Dimension</h2>
          <hr />
        </div>
        <div class="as-di">
          <div>
            <img src="src/assets/ass_dimension/sl&v.png" alt="abc" width="90px" height="80px"/>
            <p>Strategic Leadership & Vision</p>
          </div>

          <div>
            <img src="src/assets/ass_dimension/ci.png" alt="" width="90px" height="80px"/>
            <p>Culture Integration</p>
          </div>

          <div>
            <img src="src/assets/ass_dimension/g&dm.png" alt="" width="90px" height="80px"/>
            <p>Governance & Decision Making</p>
          </div>

          <div>
            <img src="src/assets/ass_dimension/lc&s.png" alt="" width="90px" height="80px"/>
            <p>Leadership Capability & Succession</p>
          </div>
          <div>
            <img src="src/assets/ass_dimension/ci.png" alt="" width="90px" height="80px"/>
            <p>Change Agility</p>
          </div>
        </div>
        <div class="sub-topic">
          <h2>How It Works</h2>
          <hr />
        </div>
        <div class="ho-it-wo">
          <div>
            <div>
              <img src="src/assets/how_it_works/1.png" alt="" height="50px" width="50px"/>
            </div>
            <div id='sub-tit'>
              <h3>Answer Structured Questions</h3>
              <p>Leaders and teams respond to carefully designed assessment questions.</p>
            </div>
          </div>
          <div>
            <img src="src/assets/how_it_works/2.png" alt="" height="50px" width="50px"/>
            <div id='sub-tit'>
              <h3>Automated Scoring & Analysis</h3>
              <p>Responses are analyzed using a standardized scoring framework.</p>
            </div>
          </div>
          <div>
            <img src="src/assets/how_it_works/3.png" alt="" height="50px" width="50px"/>
            <div id='sub-tit'>
              <h3>Maturity Level Indentification</h3>
              <p>Each dimension is mapped to a clear maturity level.</p>
            </div>
          </div>
          <div>
            <img src="src/assets/how_it_works/4.png" alt="" height="50px" width="50px"/>
            <div id='sub-tit'>
              <h3>Actionable Insights & Roadmap</h3>
              <p>Receive recommendations to move to the next maturity stage.</p>
            </div>
          </div>
        </div>

        <div class="assess-button">
          <h2>Ready to Assess Your Organization?</h2>
          <p>Take the first step towards structured growth and operational excellence</p>
          <button>Start Your OMA Assessment Today</button>
        </div>
        
      </div>

    </>
  )
}

export default App
