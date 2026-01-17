import React, { useState } from 'react';
import { 
  Briefcase, Target, TrendingUp, FileText, Users, Search, 
  Clock, DollarSign, MapPin, Award, AlertCircle, Copy, 
  CheckCircle2, ArrowRight, Sparkles, Building2 
} from 'lucide-react';

const UnifiedJobPlatform = () => {
  const [activeTab, setActiveTab] = useState('setup');
  const [profile, setProfile] = useState({
    skills: ['Python', 'FastAPI', 'Docker'],
    experience: 1,
    locations: ['Bangalore'],
    roles: ['Backend Developer'],
    salary: 800000
  });

  const [matches, setMatches] = useState(null);
  const [gapAnalysis, setGapAnalysis] = useState(null);
  const [jobDesc, setJobDesc] = useState(null);

  const skills = ['Python', 'JavaScript', 'React', 'Node.js', 'FastAPI', 'Django', 'Docker', 'Kubernetes', 'AWS', 'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Git', 'TypeScript', 'GraphQL'];
  const locations = ['Bangalore', 'Hyderabad', 'Mumbai', 'Delhi', 'Pune', 'Remote'];
  const roles = ['Backend Developer', 'Frontend Developer', 'Full Stack Developer', 'DevOps Engineer'];

  const jobs = [
    { id: 'J001', title: 'Backend Developer', skills: ['Python', 'FastAPI', 'PostgreSQL', 'Docker'], exp: '0-2 years', location: 'Bangalore', salary: [600000, 1000000], company: 'TechCorp' },
    { id: 'J002', title: 'Full Stack Developer', skills: ['Python', 'React', 'PostgreSQL', 'AWS'], exp: '1-3 years', location: 'Hyderabad', salary: [800000, 1400000], company: 'InnovateLabs' },
    { id: 'J003', title: 'Senior Backend Developer', skills: ['Python', 'Django', 'PostgreSQL', 'Redis'], exp: '4-6 years', location: 'Bangalore', salary: [1500000, 2500000], company: 'ScaleUp' },
    { id: 'J004', title: 'DevOps Engineer', skills: ['Docker', 'Kubernetes', 'AWS'], exp: '2-4 years', location: 'Pune', salary: [1000000, 1800000], company: 'CloudTech' },
    { id: 'J005', title: 'Frontend Developer', skills: ['JavaScript', 'React', 'TypeScript'], exp: '0-2 years', location: 'Mumbai', salary: [500000, 900000], company: 'DesignHub' }
  ];

  const matchJobs = () => {
    const results = jobs.map(job => {
      const matched = job.skills.filter(s => profile.skills.includes(s));
      const missing = job.skills.filter(s => !profile.skills.includes(s));
      const skillScore = (matched.length / job.skills.length) * 100;
      const locScore = profile.locations.includes(job.location) ? 100 : 0;
      const salScore = profile.salary >= job.salary[0] && profile.salary <= job.salary[1] ? 100 : 50;
      const expParts = job.exp.split('-');
      const minExp = parseInt(expParts[0]);
      const maxExp = parseInt(expParts[1]);
      const expScore = profile.experience >= minExp && profile.experience <= maxExp ? 100 : 70;
      const roleScore = profile.roles.some(r => job.title.includes(r)) ? 100 : 50;
      const total = skillScore * 0.4 + locScore * 0.2 + salScore * 0.15 + expScore * 0.15 + roleScore * 0.1;
      
      return {
        ...job,
        score: Math.round(total * 10) / 10,
        matched,
        missing,
        breakdown: { skill: Math.round(skillScore), location: locScore, salary: Math.round(salScore), experience: Math.round(expScore), role: roleScore }
      };
    });
    
    results.sort((a, b) => b.score - a.score);
    setMatches(results);
    setActiveTab('matches');
  };

  const analyzeGap = (job) => {
    const matched = profile.skills.filter(s => job.skills.includes(s));
    const missing = job.skills.filter(s => !profile.skills.includes(s));
    const gap = Math.round((missing.length / job.skills.length) * 100);
    const readiness = Math.max(0, 100 - gap);
    const roadmap = [];
    let phase = 1;
    for (let i = 0; i < missing.length; i += 2) {
      roadmap.push({
        phase: phase++,
        months: Math.min(missing.length - i, 2) * 2,
        skills: missing.slice(i, i + 2)
      });
    }
    setGapAnalysis({ job, matched, missing, gap, readiness, roadmap, totalMonths: roadmap.reduce((a, r) => a + r.months, 0) });
    setActiveTab('gap');
  };

  const generateDesc = (job) => {
    setJobDesc({
      ...job,
      about: `Join ${job.company} as a ${job.title}. Work with cutting-edge technologies.`,
      responsibilities: job.skills.map(s => `Develop systems using ${s}`),
      perks: ['Competitive salary', 'Health insurance', 'Learning budget', 'Flexible work']
    });
    setActiveTab('description');
  };

  const toggle = (key, val) => {
    setProfile(p => ({
      ...p,
      [key]: p[key].includes(val) ? p[key].filter(x => x !== val) : [...p[key], val]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4 px-6 py-3 bg-white rounded-2xl shadow-xl">
            <Briefcase className="w-10 h-10 text-blue-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Wevolve</h1>
            <Sparkles className="w-6 h-6 text-yellow-500" />
          </div>
          <p className="text-gray-600 text-xl">AI-Powered Career Development Platform</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl mb-8 p-2">
          <div className="grid grid-cols-4 gap-2">
            <button onClick={() => setActiveTab('setup')} className={`px-4 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 ${activeTab === 'setup' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}>
              <Users className="w-5 h-5" />
              <span className="hidden sm:inline">Profile</span>
            </button>
            <button onClick={() => setActiveTab('matches')} disabled={!matches} className={`px-4 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 ${activeTab === 'matches' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700'} disabled:opacity-50`}>
              <Target className="w-5 h-5" />
              <span className="hidden sm:inline">Matches</span>
            </button>
            <button onClick={() => setActiveTab('gap')} disabled={!gapAnalysis} className={`px-4 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 ${activeTab === 'gap' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700'} disabled:opacity-50`}>
              <TrendingUp className="w-5 h-5" />
              <span className="hidden sm:inline">Gap</span>
            </button>
            <button onClick={() => setActiveTab('description')} disabled={!jobDesc} className={`px-4 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 ${activeTab === 'description' ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-700'} disabled:opacity-50`}>
              <FileText className="w-5 h-5" />
              <span className="hidden sm:inline">Details</span>
            </button>
          </div>
        </div>

        {activeTab === 'setup' && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold mb-6">Build Your Profile</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-3">Your Skills ({profile.skills.length})</label>
                <div className="max-h-64 overflow-y-auto border-2 rounded-xl p-4 bg-gray-50">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {skills.map(s => (
                      <button key={s} onClick={() => toggle('skills', s)} className={`px-3 py-2 rounded-lg border-2 text-sm font-medium ${profile.skills.includes(s) ? 'border-blue-500 bg-blue-500 text-white' : 'border-gray-200'}`}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Experience (Years)</label>
                  <input type="number" value={profile.experience} onChange={e => setProfile({...profile, experience: parseInt(e.target.value) || 0})} className="w-full px-4 py-2 border-2 rounded-lg" min="0" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Expected Salary (₹)</label>
                  <input type="number" value={profile.salary} onChange={e => setProfile({...profile, salary: parseInt(e.target.value) || 0})} className="w-full px-4 py-2 border-2 rounded-lg" step="100000" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3">Preferred Locations</label>
                <div className="flex flex-wrap gap-2">
                  {locations.map(l => (
                    <button key={l} onClick={() => toggle('locations', l)} className={`px-4 py-2 rounded-lg border-2 font-medium ${profile.locations.includes(l) ? 'border-purple-500 bg-purple-500 text-white' : 'border-gray-200'}`}>
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3">Preferred Roles</label>
                <div className="flex flex-wrap gap-2">
                  {roles.map(r => (
                    <button key={r} onClick={() => toggle('roles', r)} className={`px-4 py-2 rounded-lg border-2 font-medium ${profile.roles.includes(r) ? 'border-green-500 bg-green-500 text-white' : 'border-gray-200'}`}>
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <button onClick={matchJobs} disabled={profile.skills.length === 0} className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl disabled:opacity-50 flex items-center justify-center gap-2">
                <Search className="w-6 h-6" />
                Find Matching Jobs
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}

        {activeTab === 'matches' && matches && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold">Found {matches.length} Matching Jobs</h2>
            </div>
            {matches.map((job, idx) => (
              <div key={job.id} className="relative bg-white rounded-2xl shadow-xl p-6 border-2 border-gray-100 hover:border-blue-200">
                <div className="absolute -top-3 -left-3 w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  {idx + 1}
                </div>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold">{job.title}</h3>
                    <p className="text-gray-600 flex items-center gap-2 mt-1">
                      <Building2 className="w-4 h-4" />
                      {job.company}
                    </p>
                  </div>
                  <div className="text-3xl font-bold text-blue-600">{job.score}%</div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-lg text-sm">
                    <MapPin className="w-4 h-4" />
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-lg text-sm">
                    <Clock className="w-4 h-4" />
                    {job.exp}
                  </span>
                  <span className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-lg text-sm">
                    <DollarSign className="w-4 h-4" />
                    ₹{(job.salary[0]/100000).toFixed(1)}L-₹{(job.salary[1]/100000).toFixed(1)}L
                  </span>
                </div>

                <div className="grid grid-cols-5 gap-2 mb-4">
                  {Object.entries(job.breakdown).map(([k, v]) => (
                    <div key={k} className="text-center">
                      <p className="text-xs text-gray-500 mb-1">{k}</p>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className={`h-2 rounded-full ${v >= 80 ? 'bg-green-500' : v >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{width: `${v}%`}} />
                      </div>
                      <p className="text-xs font-bold mt-1">{v}%</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {job.matched.map(s => (
                    <span key={s} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">{s}</span>
                  ))}
                  {job.missing.map(s => (
                    <span key={s} className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">{s}</span>
                  ))}
                </div>

                <div className="flex gap-2">
                  <button onClick={() => analyzeGap(job)} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Analyze Gap
                  </button>
                  <button onClick={() => generateDesc(job)} className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'gap' && gapAnalysis && (
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <Award className="w-10 h-10 text-blue-600 mb-2" />
                <p className="text-4xl font-bold text-blue-600">{gapAnalysis.readiness}%</p>
                <p className="text-sm text-gray-600">Readiness</p>
              </div>
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <AlertCircle className="w-10 h-10 text-red-600 mb-2" />
                <p className="text-4xl font-bold text-red-600">{gapAnalysis.gap}%</p>
                <p className="text-sm text-gray-600">Skill Gap</p>
              </div>
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <Clock className="w-10 h-10 text-green-600 mb-2" />
                <p className="text-4xl font-bold text-green-600">{gapAnalysis.totalMonths}mo</p>
                <p className="text-sm text-gray-600">Learning Time</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-2xl font-bold mb-4">Learning Roadmap for {gapAnalysis.job.title}</h3>
              <div className="space-y-4">
                {gapAnalysis.roadmap.map(r => (
                  <div key={r.phase} className="border-l-4 border-blue-500 bg-blue-50 rounded-r-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3 py-1 bg-blue-600 text-white rounded-full font-bold">Phase {r.phase}</span>
                      <span className="text-sm text-gray-600">{r.months} months</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {r.skills.map(s => (
                        <span key={s} className="px-3 py-1 bg-white border-2 border-blue-200 text-blue-700 rounded-lg">{s}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  Matching Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {gapAnalysis.matched.map(s => (
                    <span key={s} className="px-3 py-2 bg-green-100 text-green-700 rounded-lg">{s}</span>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  Missing Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {gapAnalysis.missing.map(s => (
                    <span key={s} className="px-3 py-2 bg-red-100 text-red-700 rounded-lg">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'description' && jobDesc && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold">{jobDesc.title} at {jobDesc.company}</h2>
              <button onClick={() => navigator.clipboard.writeText('Copied')} className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2">
                <Copy className="w-4 h-4" />
                Copy
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-2">About the Role</h3>
                <p className="text-gray-700">{jobDesc.about}</p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2">Key Responsibilities</h3>
                <ul className="list-disc list-inside space-y-1">
                  {jobDesc.responsibilities.map((r, i) => (
                    <li key={i} className="text-gray-700">{r}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2">Required Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {jobDesc.skills.map(s => (
                    <span key={s} className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg">{s}</span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2">What We Offer</h3>
                <ul className="list-disc list-inside space-y-1">
                  {jobDesc.perks.map((p, i) => (
                    <li key={i} className="text-gray-700">{p}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Location</p>
                  <p className="font-semibold">{jobDesc.location}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Experience</p>
                  <p className="font-semibold">{jobDesc.exp}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Salary Range</p>
                  <p className="font-semibold">₹{(jobDesc.salary[0]/100000).toFixed(1)}L - ₹{(jobDesc.salary[1]/100000).toFixed(1)}L</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UnifiedJobPlatform;