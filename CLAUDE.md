# CLAUDE.md - Continuous Innovation Framework App

This project is building an application based on the **Continuous Innovation Framework (CIF)** from "Running Lean, 3rd Edition" by Ash Maurya. The app will help evaluate potential business ideas quickly to determine the best focus areas.

## Project Purpose

An app to rapidly evaluate business ideas using the Continuous Innovation Framework, helping users:
- Quickly assess idea desirability, viability, and feasibility
- Avoid the common startup failure mode of "building something nobody wants"
- Make evidence-based decisions about which ideas to pursue
- Track progress through validation stages

## Key Concepts from Running Lean 3rd Edition

### The 10 Mindsets of Continuous Innovation

1. **The business model is the product** - Not just software/features
2. **Love the problem, not your solution** - Avoid Innovator's Bias
3. **Traction is the goal** - Measure progress by customer throughput, not build velocity
4. **Right action, right time** - Avoid premature optimization
5. **Tackle risks in stages** - Desirability → Viability → Feasibility
6. **Constraints are a gift** - They drive focus and reveal riskiest assumptions
7. **Hold yourself externally accountable** - 90-day cycles with reviews
8. **Place many small bets** - Instead of few large bets
9. **Make evidence-based decisions** - Not gut-based
10. **Breakthrough requires unexpected outcomes** - Discovery before traction

### Core Models

#### 1. Lean Canvas (9 boxes)
A 1-page business model that captures:
- **Customer Segments** - Who are your early adopters?
- **Problem** - Top 3 problems + existing alternatives
- **Unique Value Proposition (UVP)** - Single, clear, compelling message
- **Solution** - Top 3 features addressing top problems
- **Channels** - Path to customers (inbound/outbound)
- **Revenue Streams** - How you make money
- **Cost Structure** - Customer acquisition, distribution, hosting, people
- **Key Metrics** - AARRR (Acquisition, Activation, Retention, Revenue, Referral)
- **Unfair Advantage** - What cannot be easily copied or bought

#### 2. Customer Factory (AARRR Metrics)
Visualizes traction as manufacturing customers:
- **Acquisition** - Users come from channels (leads)
- **Activation** - Users have great first experience (activated users)
- **Retention** - Users come back (engaged users)
- **Revenue** - Users pay you (customers)
- **Referral** - Users refer others (advocates)

#### 3. Customer Forces Model
Four forces that determine if customers will switch to your solution:
- **PUSH** - Problems with current solution (switching trigger)
- **PULL** - Promise of something better (your UVP)
- **INERTIA** - Resistance to change from status quo
- **FRICTION** - Anxiety about adopting new solution

For a switch: PUSH + PULL must be greater than INERTIA + FRICTION

#### 4. Traction Roadmap
- Set a 3-year MSC (Minimum Success Criteria) goal
- Use 10x growth rate modeling
- Break into 12 quarterly (90-day) cycles
- Define stage-based milestones

### The Three Stages of Validation

#### Stage 1: Problem/Solution Fit
- **Goal**: Demonstrate demand before building
- **Duration**: 3-6 months (1-2 90-day cycles)
- **Key Activities**:
  - Problem discovery interviews
  - Solution design
  - Mafia offer delivery
- **Success Criteria**: Secure tangible commitments (advance payments, LOIs)

#### Stage 2: Product/Market Fit
- **Goal**: Build and validate MVP with early adopters
- **Duration**: 6-12 months
- **Key Activities**:
  - Build MVP in sprints
  - Launch to early adopters
  - Optimize happy customer loop (Activation + Retention)

#### Stage 3: Scale
- **Goal**: Grow to hit MSC
- **Activities**: Implement growth loops (revenue, retention, referral)

### Stress Testing Framework

#### Desirability (Customer Risk)
- **Key Question**: Will customers want this?
- **Test**: Innovator's Gift analysis
- **Focus**: Customer segments, problems, existing alternatives, UVP

#### Viability (Market Risk)
- **Key Question**: Can this become a big enough business?
- **Test**: Fermi estimate with traction roadmap
- **Focus**: Revenue streams, cost structure, market size

#### Feasibility (Technical Risk)
- **Key Question**: Can we build this?
- **Test**: Now-Next-Later rollout plan
- **Focus**: Solution, team skills, resources, timeline

### Key Frameworks

#### Innovator's Bias vs Innovator's Gift
- **Bias**: Love for solution blinds you to customer problems
- **Gift**: New problems emerge from old solutions (find switching triggers)

#### D-AARRR-T (The Art of Testing)
- **D**iscovery first (generative experiments)
- **AARRR** metrics
- **T**raction last (evaluative experiments)

#### Demo-Sell-Build (not Build-Demo-Sell)
- Create offer/demo first
- Sell to early adopters
- Build only after validation

#### Mafia Offer Campaign (60-80% conversion rate)
Three steps:
1. **Problem Discovery** - Understand problems through interviews
2. **Solution Design** - Design solution that causes a switch
3. **Offer Delivery** - Pitch irresistible offer

### 90-Day Cycle Structure

**Week 1-2: Modeling & Prioritizing**
- Update models (Lean Canvas, traction roadmap)
- 90-Day Cycle Kickoff Meeting
- Set OKRs
- 90-Day Cycle Planning Meeting

**Weeks 3-12: Testing (5 x 2-week sprints)**
- Sprint Planning → Daily Standups → Sprint Review
- Run campaigns and experiments

**End: 90-Day Cycle Review**
- Decide: Pivot, Persevere, or Pause

### Seven Habits for Effective Experiments

1. Declare expected outcomes upfront
2. Make it a team sport (avoid HiPPO bias)
3. Emphasize estimation, not precision
4. Measure actions, not words
5. Turn assumptions into falsifiable hypotheses
6. Time-box experiments (2-week sprints)
7. Always use a control group

### Team Composition

**Minimum Viable Team (2-pizza rule)**
- **Hacker**: Product development, technical skills
- **Hustler**: Marketing, sales, communication
- **Designer**: UX, aesthetics, user flows

## Reference Materials

- **Book Text**: `running-lean-3rd/Running Lean, 3rd Edition - Ash Maurya.txt`
- **Images**: `running-lean-3rd/Images/` (renamed to match figure references)

### Image Naming Convention
Images have been renamed to match book figure references:
- `Figure_I-X_...png` - Introduction figures
- `Figure_P1-X_...png` - Part I opener figures
- `Figure_II-X_...png` - Part II opener figures
- `Figure_III-X_...png` - Part III opener figures
- `Figure_X-Y_...png` - Chapter X, Figure Y

## App Features to Build

Based on the CIF, the app should help users:

### Core Features
1. **Idea Capture** - Quick brain dump of business ideas
2. **Lean Canvas Builder** - Interactive 9-box canvas creation
3. **Viability Calculator** - Fermi estimate with MSC goal setting
4. **Traction Roadmap Generator** - Visual 3-year milestone planning
5. **Customer Forces Canvas** - Capture interview insights
6. **90-Day Cycle Tracker** - OKRs, sprints, experiments

### Evaluation Features
1. **Desirability Score** - Rate problem/solution fit indicators
2. **Viability Score** - Market size, pricing, LTV calculations
3. **Feasibility Score** - Technical risk, team capabilities
4. **Overall Idea Rating** - Weighted composite score

### Comparison Features
1. **Side-by-side idea comparison**
2. **Portfolio view of all ideas**
3. **Prioritization matrix**
4. **Time/effort vs. potential value chart**

## Development Commands

```bash
# Navigate to project
cd /Users/michaelgreen/dev_stuff/productivity/continuous-innovation-framework/cif-app

# [Add build/run commands as development progresses]
```

## Key Quotes from the Book

> "The number one reason why startups fail is that they build something nobody wants."

> "Life's too short to build something nobody wants."

> "Traction is the rate at which you capture monetizable value from your customers."

> "Customers don't buy products, they buy a promise of something better."

> "A mafia offer is an offer your customers cannot refuse."

> "Understanding your customer's problems grants you superpowers."

> "Speed of learning is the new unfair advantage."

> "Halving your sales cycle has the same effect as doubling your close rate."

> "New customers come from the actions of past customers." (sustainable growth)

## Additional Frameworks (from Complete Book Reading)

### The 5 P's of MVP
When designing your MVP, ensure all five are covered:
1. **Problem** - Smallest subset of problems that can cause a switch AND make business model work
2. **Promise** - UVP that is different, attention-grabbing, and measurable
3. **Price** - Fair price anchored against existing alternatives
4. **People** - Ideal early adopters with above-average motivation to switch
5. **Packaging** - How you deliver value (Concierge, Wizard-of-Oz, Foot-in-the-Door, or Release 1.0)

### MVP Validation Recipes
1. **Concierge MVP** - You are the product (services model) until ready to automate
2. **Wizard-of-Oz MVP** - Fake it till you make it (cobble together existing solutions)
3. **Foot-in-the-Door MVP** - Deliver smallest UVP to get inside customer's world
4. **Release 1.0 MVP** - Traditional scoped-down feature set

### The Happy Customer Loop (Post-Launch)
After acquisition, focus on:
1. **Activation** - Get customers to first "aha moment" in under 30 minutes
2. **Retention** - Create habit loops through triggers, actions, rewards
3. **Switch Prevention** - Make product the new status quo

**Behavior Design (Fogg Model):**
- Behavior = Motivation + Ability + Prompt (at same moment)
- Habits form through repetition and rewards

**80/20 Rule Post-Launch:**
- 80% time on measuring/improving existing features
- 20% time on new features

### Customer Progress Roadmap
Break the big desired outcome into smaller summits:
- First aha moment in under 30 minutes
- Use doubling rule (each summit ~2x effort of previous)
- Prefer intrinsic rewards over extrinsic (badges)
- Prefer doing over learning
- Hide features not needed for current summit

### Mafia Offer Pitch Structure (Hero's Journey)
**Characters:**
- Hero = Your early adopter (not you!)
- Villain = True competition (existing alternatives)
- Guide = You (Obi-Wan, Dumbledore, Fairy Godmother)
- Gift = Your product

**4-Act Structure:**
1. **Setup** - Share bigger context, raise stakes, tease promise
2. **Confrontation** - Name true competition, list problems, break the old way
3. **Resolution** - Demo your better new way (emotional purchase happens here)
4. **Call-to-action** - Ask for the switch, price anchoring, specific next steps

### Growth Rockets (Post Product/Market Fit)

**Three Types of Growth Loops:**

1. **Revenue Growth Loop**
   - Reinvest revenue into paid acquisition (ads, sales team)
   - Sustainability test: LTV > 3x CAC, payback < 12 months

2. **Retention Growth Loop**
   - Use content/data from existing users to attract new users
   - Examples: YouTube (user content), Yelp (reviews), Waze (data)

3. **Referral Growth Loop**
   - Existing users bring new users
   - Viral coefficient (K) > 1 = true virality
   - Optimize viral cycle time

**Rocket Ship Model:**
- Booster rockets = nonscalable channels (warm referrals, direct sales, events)
- Growth rocket = scalable channel with sustainable flywheel

### The BOOTSTART Manifesto (16 Principles)
1. Entrepreneurs are everywhere
2. The garage entrepreneur persona has changed
3. There is no better time to start
4. Most products still fail
5. A dozen reasons why products fail
6. Number one reason: building something nobody wants
7. Number two reason: never starting
8. You don't need permission to start
9. Love the problem, not your solution
10. Don't write a business plan (use Lean Canvas)
11. Your business model is the product
12. Focus on time, not timing
13. Not acceleration, but deceleration (focus on right things)
14. Not faux validation, but traction
15. Remove failure from vocabulary (course-correct instead)
16. It's time to act on your big idea

### Elevator Pitch Template
```
When [customers] encounter a [triggering event],
they need to do [job-to-be-done] to achieve [desired outcome].

They would normally use [existing alternatives],
but because of [switching trigger] these have [problems].
If left unaddressed, then [what's at stake].

So we built a solution that helps [customers]
achieve [desired outcome] by/with [unique value proposition].
```

### Stockdale Paradox (Important Mindset)
> "You must maintain unwavering faith that you can and will prevail in the end, regardless of the difficulties, and at the same time, have the discipline to confront the most brutal facts of your current reality, whatever they might be."

**Application:** Be brutal with your business model assumptions, but have faith in yourself and team.

## Recommended Reading (from book)
- The Lean Startup - Eric Ries
- Crossing the Chasm - Geoffrey Moore
- Competing Against Luck - Clayton Christensen
- The Power of Habit - Charles Duhigg
- Tiny Habits - BJ Fogg
- Never Split the Difference - Chris Voss
- Building a StoryBrand - Donald Miller
- Business Model Generation - Alex Osterwalder
