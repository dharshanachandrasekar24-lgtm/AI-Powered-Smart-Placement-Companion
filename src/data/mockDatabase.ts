import { College, JobOpportunity, PracticeQuestion, PlacementDrive, InterviewQuestionItem } from '../types';

export const INITIAL_COLLEGES: College[] = [
  {
    id: 'col-1',
    name: 'Apex Institute of Technology',
    code: 'AIT-01',
    location: 'Bangalore, Karnataka',
    affiliatedUniversity: 'Visvesvaraya Technological University',
    adminName: 'Prof. Ramesh Kulkarni',
    adminEmail: 'tpo.apex@ait.edu.in',
    totalStudents: 1420,
    placedStudents: 1180,
    activeDrives: 14,
    placementRate: 83.1,
    averagePackageLPA: 7.8
  },
  {
    id: 'col-2',
    name: 'National College of Engineering & Science',
    code: 'NCES-04',
    location: 'Hyderabad, Telangana',
    affiliatedUniversity: 'Jawaharlal Nehru Technological University',
    adminName: 'Dr. Sunita Rao',
    adminEmail: 'placements@nces.ac.in',
    totalStudents: 1850,
    placedStudents: 1540,
    activeDrives: 18,
    placementRate: 83.2,
    averagePackageLPA: 8.4
  },
  {
    id: 'col-3',
    name: 'St. Xavier Institute of Computing',
    code: 'SXIC-12',
    location: 'Pune, Maharashtra',
    affiliatedUniversity: 'Savitribai Phule Pune University',
    adminName: 'Prof. Marcus Fernandes',
    adminEmail: 'career.center@sxic.edu',
    totalStudents: 980,
    placedStudents: 810,
    activeDrives: 9,
    placementRate: 82.6,
    averagePackageLPA: 7.2
  }
];

export const INITIAL_JOBS: JobOpportunity[] = [
  {
    id: 'job-1',
    title: 'Associate Software Engineer - Cloud & Backend',
    company: 'Amazon Web Services',
    companyLogoText: 'AWS',
    location: 'Bangalore, India',
    workMode: 'Hybrid',
    type: 'Full-time',
    packageLPA: '18.5 - 24.0 LPA',
    requiredSkills: ['Python', 'Java', 'Data Structures', 'Algorithms', 'SQL', 'AWS', 'Distributed Systems'],
    minCGPA: 7.5,
    eligibleBranches: ['Computer Science', 'Information Technology', 'Electronics & Comm.'],
    maxBacklogs: 0,
    deadline: '2026-11-20',
    description: 'Design and implement resilient backend cloud microservices, develop performant distributed APIs, and maintain high-scale data workflows.'
  },
  {
    id: 'job-2',
    title: 'Systems Engineer (Digital Cadre)',
    company: 'Tata Consultancy Services (TCS)',
    companyLogoText: 'TCS',
    location: 'Chennai / Hyderabad, India',
    workMode: 'On-site',
    type: 'Drive',
    packageLPA: '7.5 - 9.0 LPA',
    requiredSkills: ['Java', 'Python', 'SQL', 'Object Oriented Programming', 'Git', 'Data Structures'],
    minCGPA: 6.5,
    eligibleBranches: ['Computer Science', 'Information Technology', 'ECE', 'EEE', 'Mechanical'],
    maxBacklogs: 1,
    deadline: '2026-11-18',
    description: 'Digital specialized cadre hiring for enterprise cloud transformation, API development, and automated test orchestration.'
  },
  {
    id: 'job-3',
    title: 'Specialist Programmer (Power Programmer)',
    company: 'Infosys Limited',
    companyLogoText: 'INFY',
    location: 'Bangalore / Pune, India',
    workMode: 'Hybrid',
    type: 'Drive',
    packageLPA: '9.5 - 11.2 LPA',
    requiredSkills: ['Python', 'C++', 'Data Structures', 'Dynamic Programming', 'System Design', 'PostgreSQL'],
    minCGPA: 7.0,
    eligibleBranches: ['Computer Science', 'Information Technology', 'AI & Data Science'],
    maxBacklogs: 0,
    deadline: '2026-11-25',
    description: 'High-caliber competitive programming role focused on building next-generation algorithmic pipelines, cloud-native services, and AI solutions.'
  },
  {
    id: 'job-4',
    title: 'Full Stack Developer - React & Node.js',
    company: 'Accenture Technology',
    companyLogoText: 'ACN',
    location: 'Gurugram / Bangalore, India',
    workMode: 'Hybrid',
    type: 'Full-time',
    packageLPA: '6.5 - 8.2 LPA',
    requiredSkills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Express', 'MongoDB', 'REST APIs'],
    minCGPA: 6.5,
    eligibleBranches: ['Computer Science', 'Information Technology', 'ECE'],
    maxBacklogs: 1,
    deadline: '2026-11-30',
    description: 'Create responsive web user interfaces and robust Node.js backend microservices for global Fortune 500 enterprise applications.'
  },
  {
    id: 'job-5',
    title: 'Data & Machine Learning Engineer',
    company: 'Microsoft IDC',
    companyLogoText: 'MSFT',
    location: 'Hyderabad, India',
    workMode: 'Hybrid',
    type: 'Full-time',
    packageLPA: '21.0 - 26.5 LPA',
    requiredSkills: ['Python', 'Machine Learning', 'Scikit-learn', 'SQL', 'Data Structures', 'Docker', 'PyTorch'],
    minCGPA: 8.0,
    eligibleBranches: ['Computer Science', 'Information Technology', 'AI & Data Science'],
    maxBacklogs: 0,
    deadline: '2026-12-05',
    description: 'Work alongside world-class AI researchers to deploy production predictive models, vector search pipelines, and enterprise data models.'
  },
  {
    id: 'job-6',
    title: 'Software Development Engineer - Core Platform',
    company: 'Zoho Corporation',
    companyLogoText: 'ZOHO',
    location: 'Chennai / Tenkasi, India',
    workMode: 'On-site',
    type: 'Drive',
    packageLPA: '8.4 - 12.0 LPA',
    requiredSkills: ['Java', 'C', 'Data Structures', 'Algorithms', 'Networking', 'Database Design'],
    minCGPA: 6.0,
    eligibleBranches: ['All Engineering Branches'],
    maxBacklogs: 2,
    deadline: '2026-11-22',
    description: 'Zoho campus recruitment for passionate problem solvers who love building clean, proprietary software infrastructure from the ground up.'
  }
];

export const INITIAL_DRIVES: PlacementDrive[] = [
  {
    id: 'drv-1',
    companyName: 'Tata Consultancy Services',
    jobRole: 'Digital & Ninja Placement Drive 2027',
    ctcLPA: '7.5 - 9.0 LPA',
    driveDate: '2026-11-22',
    registrationDeadline: '2026-11-18',
    collegeId: 'col-1',
    eligibleBranches: ['Computer Science', 'Information Technology', 'ECE'],
    minCGPA: 6.5,
    status: 'Upcoming',
    totalRegistered: 284,
    shortlistedCount: 142
  },
  {
    id: 'drv-2',
    companyName: 'Amazon Web Services',
    jobRole: 'Cloud Support & SDE Campus Drive',
    ctcLPA: '18.5 - 24.0 LPA',
    driveDate: '2026-11-28',
    registrationDeadline: '2026-11-20',
    collegeId: 'col-1',
    eligibleBranches: ['Computer Science', 'Information Technology'],
    minCGPA: 7.5,
    status: 'Upcoming',
    totalRegistered: 198,
    shortlistedCount: 45
  },
  {
    id: 'drv-3',
    companyName: 'Infosys Limited',
    jobRole: 'Specialist Programmer Campus Hiring',
    ctcLPA: '9.5 - 11.2 LPA',
    driveDate: '2026-12-02',
    registrationDeadline: '2026-11-25',
    collegeId: 'col-1',
    eligibleBranches: ['Computer Science', 'Information Technology', 'AI & Data Science'],
    minCGPA: 7.0,
    status: 'Upcoming',
    totalRegistered: 165,
    shortlistedCount: 52
  }
];

export const MOCK_INTERVIEW_QUESTIONS: InterviewQuestionItem[] = [
  {
    id: 'iq-1',
    category: 'Technical',
    difficulty: 'Intermediate',
    question: 'Can you explain the difference between Process and Thread in modern Operating Systems, and how context switching overhead differs between them?',
    idealKeyPoints: [
      'Process has separate virtual address space; threads share parent process memory',
      'Context switching between processes requires TLB invalidation and page table reload',
      'Thread context switching is lighter because address space remains identical',
      'Inter-process communication requires pipes/sockets/shared memory; threads communicate via memory structures'
    ],
    sampleGoodAnswer: 'A process is an executing program instance with its own isolated virtual memory address space, registers, file descriptors, and security tokens. Threads are lightweight execution units within a process that share code, data, and open files, while having independent call stacks and program counters. Process context switching has higher overhead because it forces memory management unit (MMU) page table reloads and CPU TLB cache flushes. Thread context switching within the same process skips page directory changes, preserving hardware caching.'
  },
  {
    id: 'iq-2',
    category: 'Technical',
    difficulty: 'Intermediate',
    question: 'How does indexing in a relational database (e.g., B-Tree index) improve query execution performance, and what are the trade-offs on write operations?',
    idealKeyPoints: [
      'B-Tree keeps sorted keys to provide O(log N) lookup instead of O(N) full table scan',
      'Supports efficient range queries and ordering',
      'Trade-off: INSERT, UPDATE, and DELETE operations must update the index tree',
      'Consumes disk storage and RAM buffer cache'
    ],
    sampleGoodAnswer: 'Relational database indexes commonly use balanced trees (B-Trees or B+Trees) to allow O(log N) search, insert, and range scans compared to O(N) full sequential table scans. While SELECT performance improves exponentially for indexed filters, the trade-off is write overhead: every INSERT, UPDATE on indexed columns, or DELETE must rebalance the tree and maintain node pointers, while also consuming extra RAM and disk space.'
  },
  {
    id: 'iq-3',
    category: 'Programming',
    difficulty: 'Intermediate',
    question: 'Explain how you would detect a cycle in a singly linked list in O(N) time and O(1) auxiliary space, and how to identify the start node of the cycle.',
    idealKeyPoints: [
      "Floyd's Tortoise and Hare algorithm with two pointers (slow moving 1 step, fast moving 2 steps)",
      'If fast reaches null, no cycle exists',
      'If slow and fast meet, cycle is confirmed',
      'Reset one pointer to head and move both at 1 step speed; their meeting point is the cycle origin'
    ],
    sampleGoodAnswer: "We use Floyd's Tortoise and Hare two-pointer cycle-finding algorithm. Initialize slow and fast pointers at the head. Slow moves one step at a time while fast moves two steps. If fast or fast.next becomes null, the list terminates with no cycle. If slow equals fast, a loop exists. To find the entrance node of the loop, reset one pointer back to the list head while leaving the other at the intersection point, then advance both by one step simultaneously; the node where they collide is the loop start."
  },
  {
    id: 'iq-4',
    category: 'HR',
    difficulty: 'Entry',
    question: 'Tell me about a challenging technical project you worked on where something unexpected failed, and how you diagnosed and resolved the issue.',
    idealKeyPoints: [
      'STAR method (Situation, Task, Action, Result)',
      'Specific technical failure (e.g. database deadlocks, memory leak, API timeout)',
      'Methodical debugging approach (logging, profiling, isolation)',
      'Measurable outcome and lessons learned'
    ],
    sampleGoodAnswer: 'In my final-year project, our real-time messaging service experienced intermittent 504 gateway timeouts under concurrent student testing. By inspecting backend metrics and database connection pools, I discovered that unclosed database connections in asynchronous handlers were exhausting the pool. I refactored the connection management using connection leasing context managers and implemented circuit breaker middleware. Response latency stabilized at 45ms and 99.9% uptime was sustained under load.'
  },
  {
    id: 'iq-5',
    category: 'Company-Specific',
    companyTarget: 'TCS',
    difficulty: 'Intermediate',
    question: 'TCS places strong emphasis on reliable enterprise architectures. What is the difference between monolithic architecture and microservices, and when should an enterprise transition?',
    idealKeyPoints: [
      'Monolith: single deployable unit, shared database, simple initial development',
      'Microservices: decentralized services with domain boundaries, independent scaling and deployment',
      'Transition triggers: team size scaling, independent release cadences, distinct scaling bottlenecks',
      'Operational complexity: network latency, distributed transactions, observability requirements'
    ],
    sampleGoodAnswer: 'A monolithic architecture packages all business modules into a unified codebase deployed as a single artifact. It is simple to debug and test initially. Microservices decompose business functions along bounded domain contexts, allowing autonomous team deployments, technology diversity, and targeted resource scaling. Enterprises should transition when team coordination on a single repository slows releases, or specific modules require independent elasticity, while ensuring mature CI/CD and distributed tracing are in place.'
  }
];

export const PRACTICE_QUESTIONS: PracticeQuestion[] = [
  // Aptitude
  {
    id: 'apt-1',
    category: 'Aptitude',
    topic: 'Time and Work',
    difficulty: 'Easy',
    question: 'A can complete a project in 12 days and B can complete the same project in 18 days. If they work together, in how many days will the project be finished?',
    options: ['7.2 days', '6.5 days', '8.0 days', '5.4 days'],
    correctOptionIndex: 0,
    explanation: "Work done by A in 1 day = 1/12. Work done by B in 1 day = 1/18. Combined 1-day work = (1/12) + (1/18) = (3 + 2)/36 = 5/36. Therefore, total days required = 36/5 = 7.2 days."
  },
  {
    id: 'apt-2',
    category: 'Aptitude',
    topic: 'Percentages & Profit/Loss',
    difficulty: 'Medium',
    question: 'A retailer buys an item at a 20% discount on the marked price and sells it at a 10% discount on the marked price. What is the retailer’s profit percentage on the cost price?',
    options: ['10%', '11.11%', '12.5%', '15%'],
    correctOptionIndex: 2,
    explanation: 'Let Marked Price = $100. Cost Price (CP) = 100 - 20 = $80. Selling Price (SP) = 100 - 10 = $90. Profit = SP - CP = 90 - 80 = $10. Profit % = (Profit / CP) * 100 = (10 / 80) * 100 = 12.5%.'
  },
  {
    id: 'apt-3',
    category: 'Aptitude',
    topic: 'Probability',
    difficulty: 'Medium',
    question: 'Two dice are rolled simultaneously. What is the probability that the sum of the numbers appearing on the top faces is greater than 9?',
    options: ['1/6', '1/9', '5/36', '7/36'],
    correctOptionIndex: 0,
    explanation: 'Total sample space = 6 * 6 = 36 outcomes. Sum > 9 means sums of 10, 11, or 12. Pairs: (4,6), (5,5), (6,4) [sum 10]; (5,6), (6,5) [sum 11]; (6,6) [sum 12]. Total favorable outcomes = 6. Probability = 6/36 = 1/6.'
  },
  {
    id: 'apt-4',
    category: 'Aptitude',
    topic: 'Time, Speed and Distance',
    difficulty: 'Easy',
    question: 'A train 180 meters long crosses an electric post in 9 seconds. What is the speed of the train in kilometers per hour (km/h)?',
    options: ['64 km/h', '72 km/h', '80 km/h', '90 km/h'],
    correctOptionIndex: 1,
    explanation: 'Speed = Distance / Time = 180 m / 9 s = 20 m/s. Convert m/s to km/h by multiplying with (18/5): Speed = 20 * (18 / 5) = 72 km/h.'
  },

  // Logical Reasoning
  {
    id: 'log-1',
    category: 'Logical Reasoning',
    topic: 'Number Series',
    difficulty: 'Easy',
    question: 'Find the next number in the sequence: 4, 9, 25, 49, 121, ?',
    options: ['144', '169', '196', '225'],
    correctOptionIndex: 1,
    explanation: 'The series consists of squares of prime numbers: 2^2 = 4, 3^2 = 9, 5^2 = 25, 7^2 = 49, 11^2 = 121. The next prime number is 13, so 13^2 = 169.'
  },
  {
    id: 'log-2',
    category: 'Logical Reasoning',
    topic: 'Coding and Decoding',
    difficulty: 'Medium',
    question: 'In a certain code language, if "SYSTEM" is coded as "SYSMET" and "NEARER" is coded as "AENRER", how will "FRACTION" be coded?',
    options: ['CARFNOIT', 'CARFTION', 'ARFCNOIT', 'FRACNOIT'],
    correctOptionIndex: 0,
    explanation: 'The word of 8 letters is split into two halves of 4 letters each: FRAC and TION. Each half is reversed: FRAC becomes CARF, and TION becomes NOIT. Combining them gives CARFNOIT.'
  },
  {
    id: 'log-3',
    category: 'Logical Reasoning',
    topic: 'Blood Relations',
    difficulty: 'Medium',
    question: 'Pointing to a photograph, Rohit said, "His mother is the only daughter of my mother." How is Rohit related to the person in the photograph?',
    options: ['Father', 'Maternal Uncle', 'Brother', 'Grandfather'],
    correctOptionIndex: 1,
    explanation: "Rohit's mother's only daughter is Rohit's sister. The person in the photograph is the son of Rohit's sister. Hence, Rohit is the maternal uncle (Mama) of the person."
  },
  {
    id: 'log-4',
    category: 'Logical Reasoning',
    topic: 'Direction Sense',
    difficulty: 'Easy',
    question: 'A student walks 20 meters North, turns right and walks 30 meters, turns right again and walks 20 meters. How far and in what direction is the student from the starting point?',
    options: ['30 meters East', '30 meters West', '20 meters East', '50 meters North-East'],
    correctOptionIndex: 0,
    explanation: 'North 20m (+Y), Right (East) 30m (+X), Right (South) 20m (-Y). The vertical displacement cancels out (20 - 20 = 0). The net position is 30 meters directly East of the origin.'
  },

  // Programming Challenges
  {
    id: 'prog-1',
    category: 'Programming',
    topic: 'Python Output Prediction',
    difficulty: 'Easy',
    question: 'What is the exact output of this Python snippet?',
    codeSnippet: `nums = [1, 2, 3, 4]
def mutate(lst):
    lst = lst + [5]
mutate(nums)
print(len(nums))`,
    options: ['4', '5', 'Error', 'None'],
    correctOptionIndex: 0,
    explanation: 'In Python, the operation `lst = lst + [5]` creates a new local variable `lst` and reassigns it within the function scope, leaving the outer list `nums` unchanged. If `lst.append(5)` or `lst += [5]` were used, it would mutate in-place. Therefore len(nums) remains 4.'
  },
  {
    id: 'prog-2',
    category: 'Programming',
    topic: 'Data Structures - Hash Map & Arrays',
    difficulty: 'Medium',
    question: 'In the Two-Sum problem, what is the optimal time and space complexity using a Hash Map?',
    options: ['Time O(N), Space O(N)', 'Time O(N log N), Space O(1)', 'Time O(N^2), Space O(1)', 'Time O(1), Space O(N)'],
    correctOptionIndex: 0,
    explanation: 'By storing each complement (target - current_val) into a Hash Map as we iterate, lookups take average O(1) time. We traverse the list once, achieving O(N) time and storing up to N elements in the map (O(N) space).'
  },
  {
    id: 'prog-3',
    category: 'Programming',
    topic: 'Java Memory & String Pool',
    difficulty: 'Medium',
    question: 'What will be printed when the following Java code executes?',
    codeSnippet: `String s1 = "Placement";
String s2 = new String("Placement");
String s3 = s2.intern();

System.out.println((s1 == s2) + " " + (s1 == s3));`,
    options: ['false true', 'true true', 'false false', 'true false'],
    correctOptionIndex: 0,
    explanation: '`s1` references the literal in the String Constant Pool. `s2` creates an explicit heap object, so `s1 == s2` is false. Calling `s2.intern()` returns the canonical representation from the String Pool, matching `s1`. Hence `s1 == s3` is true.'
  },
  {
    id: 'prog-4',
    category: 'Programming',
    topic: 'Binary Search Time Complexity',
    difficulty: 'Easy',
    question: 'Given a sorted array of 1,048,576 elements, what is the maximum number of comparisons required by Binary Search in the worst case?',
    options: ['20', '21', '100', '1024'],
    correctOptionIndex: 1,
    explanation: '1,048,576 = 2^20. In the worst case, binary search takes ceil(log2(N + 1)) = ceil(log2(1048577)) = 21 comparisons.'
  }
];
