import data from '/data.json' assert { type: 'json' }

const summary = document.getElementById('summary')
const contests = document.getElementById('contests')

// VARIABLES
let contest_title = data[0].Contest_title
let reported = data[0]['Reporting_flag']
let reg_voters = data[0]['Reg_voters']
let e_day = data[0]['Election Day_ballots']
let advance_voting = data[0]['Advance Voting_ballots']
let absentee = data[0]['Absentee by Mail_ballots']
let prov = data[0]['Provisional_ballots']
let total_ballots = e_day + advance_voting + absentee + prov

// CREATE SUMMARY
const summary_el = document.createElement('div')
summary_el.innerHTML = 
`
    <h2>Summary for: All Contests, All Districts, All Tabulators, All Counting Groups</h2>
    <table>
        <tr>
            <th>Elector Group</th>
            <th>Counting Group</th>
            <th>Ballots</th>
            <th>Voters</th>
            <th>Registered Voters</th>
            <th>Turnout</th>
        </tr>
        <tr>
            <td>Total</td>
            <td>Election Day</td>
            <td>${e_day}</td>
            <td>${e_day}</td>
            <td></td>
            <td>N/A</td>
        </tr>
        <tr>
            <td></td>
            <td>Advance Voting</td>
            <td>${advance_voting}</td>
            <td>${advance_voting}</td>
            <td></td>
            <td>N/A</td>
        </tr>
        <tr>
            <td></td>
            <td>Absentee by Mail</td>
            <td>${absentee}</td>
            <td>${absentee}</td>
            <td></td>
            <td>N/A</td>
        </tr>
        <tr>
            <td></td>
            <td>Provisional</td>
            <td>${prov}</td>
            <td>${prov}</td>
            <td></td>
            <td>N/A</td>
        </tr>
        <tr>
            <td></td>
            <td>Total</td>
            <td>${total_ballots}</td>
            <td>${total_ballots}</td>
            <td>${reg_voters}</td>
            <td>N/A</td>
        </tr>
    </table>
    <p>Precincts Reported: ${reported} of 1 (${(reported / 1) * 100}%)</p>
    <p>Registered Voters: ${total_ballots} of ${reg_voters} (N/A)</p>
    <p>Ballots Cast: ${total_ballots}</p>
`
summary.appendChild(summary_el)

// CREATE CONTEST
const contest_el = document.createElement('div')
contest_el.innerHTML = 
`
    <h2>${contest_title} (Vote for 1)</h2>
    <p>Precincts Reported: ${reported} of 1 (${(reported / 1) * 100}%)</p>
    <table>
        <tr>
            <th></th>
            <th>Election Day</th>
            <th>Advance Voting</th>
            <th>Absentee by Mail</th>
            <th>Provisional</th>
            <th colspan="2">Total</th>
        </tr>
        <tr>
            <td>Times Cast</td>
            <td>${e_day}</td>
            <td>${advance_voting}</td>
            <td>${absentee}</td>
            <td>${prov}</td>
            <td>${total_ballots} / ${reg_voters}</td>
            <td>N/A</td>
        </tr>
    </table>
`

const cand_table = document.createElement('table')
const cand_table_header = document.createElement('tr')
cand_table_header.innerHTML = 
`
    <th>Candidate</th>
    <th>Party</th>
    <th>Election Day</th>
    <th>Advance Voting</th>
    <th>Absentee by Mail</th>
    <th>Provisional</th>
    <th colspan="2">Total</th>
`
cand_table.appendChild(cand_table_header)

let cand_total_e_day = 0
let cand_total_advance = 0
let cand_total_absentee = 0
let cand_total_prov = 0 
let cand_total_votes = 0

data.forEach(candidate => {
    cand_total_e_day += candidate['Election Day_votes']
    cand_total_advance += candidate['Advance Voting_votes']
    cand_total_absentee += candidate['Absentee by Mail_votes']
    cand_total_prov += candidate['Provisional_votes']
    cand_total_votes += candidate['total_votes']

    const row = document.createElement('tr')
    row.innerHTML = 
    `
        <td>${candidate['candidate_name']}</td>
        <td></td>
        <td>${candidate['Election Day_votes']}</td>
        <td>${candidate['Advance Voting_votes']}</td>
        <td>${candidate['Absentee by Mail_votes']}</td>
        <td>${candidate['Provisional_votes']}</td>
        <td>${candidate['total_votes']}</td>
        <td></td>
    `
    cand_table.appendChild(row)
})

const cand_table_footer = document.createElement('tr')
cand_table_footer.innerHTML = 
`
    <td colspan="2">Total Votes</td>
    <td>${cand_total_e_day}</td>
    <td>${cand_total_advance}</td>
    <td>${cand_total_absentee}</td>
    <td>${cand_total_prov}</td>
    <td>${cand_total_votes}</td>
    <td></td>
`
cand_table.appendChild(cand_table_footer)

contest_el.appendChild(cand_table)      

contest_el.innerHTML += 
`       
    <table>
        <tr>
            <th></th>
            <th>Election Day</th>
            <th>Advance Voting</th>
            <th>Absentee by Mail</th>
            <th>Provisional</th>
            <th colspan="2">Total</th>
        </tr>
        <tr>
            <td>Unresolved Write-In</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td></td>
        </tr>
    </table>
`

contests.appendChild(contest_el)

// PAGE RELOADER
setTimeout(() => {
  document.location.reload();
}, 10000);