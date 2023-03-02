import data from '/data.json' assert { type: 'json' }

const contests = document.getElementById('contests')

// VARIABLES
let contest_title = data[0].Contest_title
let reg_voters = data[0]['Reg_voters']
let e_day = data[0]['Election Day_ballots']
let advance_voting = data[0]['Advance Voting_ballots']
let absentee = data[0]['Absentee by Mail_ballots']
let prov = data[0]['Provisional_ballots']
let total_ballots = e_day + advance_voting + absentee + prov

// CREATE CONTEST
const contest_el = document.createElement('div')
contest_el.classList.add('contest')
contest_el.innerHTML = 
`
    <h2>${contest_title} (Vote for 1)</h2>
    <p style="font-weight: bold">Times Cast</p>
    <table>
        <tr>
            <th>Election Day</th>
            <th>Advance Voting</th>
            <th>Absentee by Mail</th>
            <th>Provisional</th>
            <th>Total</th>
            <th>% of Registered Voters</th>
        </tr>
        <tr>
            <td>${e_day}</td>
            <td>${advance_voting}</td>
            <td>${absentee}</td>
            <td>${prov}</td>
            <td>${total_ballots}</td>
            <td>${total_ballots} of ${reg_voters} (${((total_ballots / reg_voters) * 100).toFixed(2)}%)</td>
        </tr>
    </table>
`

const cand_table = document.createElement('table')
const cand_table_header = document.createElement('tr')
cand_table_header.innerHTML = 
`
    <th>Candidate</th>
    <th>Election Day</th>
    <th>Advance Voting</th>
    <th>Absentee by Mail</th>
    <th>Provisional</th>
    <th>Total</th>
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
})

data.forEach(candidate => {
    const row = document.createElement('tr')
    row.innerHTML = 
    `
        <td>${candidate['candidate_name']}</td>
        <td>${candidate['Election Day_votes']}</td>
        <td>${candidate['Advance Voting_votes']}</td>
        <td>${candidate['Absentee by Mail_votes']}</td>
        <td>${candidate['Provisional_votes']}</td>
        <td>${candidate['total_votes']} (${((candidate['total_votes'] / cand_total_votes) * 100).toFixed(2)}%)</td>
    `
    cand_table.appendChild(row)
})

const cand_table_footer = document.createElement('tr')
cand_table_footer.innerHTML = 
`
    <td>Total Votes</td>
    <td>${cand_total_e_day}</td>
    <td>${cand_total_advance}</td>
    <td>${cand_total_absentee}</td>
    <td>${cand_total_prov}</td>
    <td>${cand_total_votes}</td>
`
cand_table.appendChild(cand_table_footer)

contest_el.appendChild(cand_table)      

contests.appendChild(contest_el)
