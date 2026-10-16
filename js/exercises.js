// KB Builder — exercise data and workout generator.
// Exercise data, muscle/difficulty/ballistic balancing, and rep targets are carried over
// from Kettlebell Flow (gustlv1.github.io/kettlebell-flow). Shared by index.html and library.html.
(function(){
  "use strict";

  // ---------- Exercise data ----------
  var LEVELS = ['Beginner','Intermediate','Advanced'];
  var CATEGORIES = ['Hinges','Squats','Presses','Rows','Carries','Core'];

  var EXERCISES = [
    { name:'Kettlebell Deadlift', difficulty:'Beginner', category:'Hinges', description:'Standard two-handed hinge lifting the bell from between your feet.', pattern:'hinge', setup:'Stand with feet hip-to-shoulder width, kettlebell on the floor a few inches in front of your shins.', steps:['Push your hips back and hinge forward, keeping your spine neutral and shins close to vertical.', 'Grip the handle with both hands, pull your shoulders back and down, and take the slack out of your arms.', 'Drive through your whole foot and snap your hips forward to stand tall, squeezing your glutes at the top.', 'Reverse the motion under control, hips back first, to return the bell to the floor.'], mistakes:['Rounding the lower back instead of hinging at the hips.', 'Squatting the weight up (knees traveling far forward) instead of hinging.', 'Yanking the bell off the floor instead of pulling the slack out first.'], muscles:['posterior-chain'] },
    { name:'Kettlebell Sumo Deadlift', difficulty:'Beginner', category:'Hinges', description:'Wide-stance deadlift targeting the inner thighs and glutes.', pattern:'hinge', setup:'Wide stance with toes turned out roughly 30 degrees, kettlebell centered on the floor between your feet.', steps:['Sit your hips down and back between your knees, keeping your chest tall.', 'Grip the handle with both hands inside your knees and pull your shoulders back.', 'Drive your knees out in line with your toes as you stand, finishing with hips fully extended.', 'Lower back down with control, hips leading the way.'], mistakes:['Letting the knees cave inward on the way up.', 'Losing the wide stance and drifting into a narrow deadlift.', 'Rounding the upper back to reach the handle.'], muscles:['posterior-chain', 'legs'] },
    { name:'Kettlebell Suitcase Deadlift', difficulty:'Beginner', category:'Hinges', description:'Deadlifting with a single kettlebell held at your side.', pattern:'hinge', setup:'Stand tall with the kettlebell on the floor at the outside of one foot.', steps:['Hinge at the hips and reach straight down for the handle, keeping both shoulders level.', 'Brace your core hard to resist leaning toward the loaded side.', 'Drive through your feet and stand tall, keeping the bell close to your leg the whole way up.', 'Lower with control, hips back first, resisting the pull to one side.'], mistakes:['Letting the torso tip sideways toward the kettlebell.', 'Shrugging the loaded shoulder up instead of keeping it packed down.', 'Rushing the rep and losing the flat back.'], muscles:['posterior-chain', 'core', 'grip'] },
    { name:'Single-Leg Deadlift', difficulty:'Intermediate', category:'Hinges', description:'Balancing on one leg while hinging forward to lower the bell toward the floor, then driving back to standing. Builds hamstring strength and single-leg stability.', pattern:'hinge', setup:'Stand on one leg holding the bell in the opposite hand, a soft bend in your standing knee.', steps:['Hinge forward at the hip while your free leg extends straight back for a counterbalance.', 'Keep your hips square to the floor — resist rotating open as you lower.', 'Lower the bell toward the floor only as far as you can control while keeping a flat back.', 'Squeeze the standing-leg glute to drive back up to tall.'], mistakes:['Letting the hips rotate open instead of staying square.', 'Rounding the back to reach farther down than your hamstring flexibility allows.', 'Losing balance because the descent is too fast — go slower than feels necessary.'], muscles:['posterior-chain'] },
    { name:'Kettlebell Good Morning', difficulty:'Beginner', category:'Hinges', description:'Bell at the chest, hinging forward at the hips with a flat back and soft knees to stretch and warm up the hamstrings.', pattern:'hinge', setup:'Hold the bell at your chest with both hands, feet hip-width apart, soft knees.', steps:['Keeping the bell locked to your chest, hinge forward at the hips with a flat back.', 'Lower until you feel a stretch through your hamstrings, not until your back rounds.', 'Drive your hips forward to return to standing.'], mistakes:['Bending at the waist/spine instead of the hips.', 'Letting the knees bend more and more until it turns into a squat.'], muscles:['posterior-chain'] },
    { name:'Kettlebell Bridge', difficulty:'Beginner', category:'Hinges', description:'Lying on back with bell on hips, driving hips upward.', pattern:'floor', setup:'Lie on your back, knees bent, feet flat on the floor, kettlebell resting on your hips.', steps:['Brace your core and press through your heels to drive your hips up toward the ceiling.', 'Squeeze your glutes hard at the top — avoid overarching the lower back.', 'Lower under control back to the floor.'], mistakes:['Pushing through the toes instead of the heels.', 'Hyperextending the lower back at the top instead of finishing with the glutes.'], muscles:['posterior-chain'] },
    { name:'Two-Handed Kettlebell Swing', difficulty:'Beginner', category:'Hinges', description:'The foundational ballistic hip-hinge: hike the bell back, then snap the hips forward to float it to chest height. Power comes from the hips, not the arms.', pattern:'swing', setup:'Stand with feet a bit wider than shoulder width, kettlebell on the floor about a foot in front of you.', steps:['Hike the bell back between your legs like snapping a football, hinging at the hips.', 'Explosively drive your hips forward, standing up tall — the arms just steer, they don’t lift.', 'Let the bell float to roughly chest height as your hips fully extend, then let gravity bring it back down.', 'Absorb the bell on the way down by hinging back into the next hike pass.'], mistakes:['Squatting the swing instead of hinging (knees bending too much, hips not driving).', 'Using the arms and shoulders to muscle the bell up instead of hip drive.', 'Letting the lower back round at the bottom of the hike pass.'], muscles:['posterior-chain'] },
    { name:'Single-Arm Kettlebell Swing', difficulty:'Beginner', category:'Hinges', description:'Swing performed with only one hand.', pattern:'swing', setup:'Same athletic hinge stance as the two-handed swing, gripping the bell in one hand.', steps:['Hike the bell back between your legs, keeping your shoulders square to the front.', 'Snap your hips forward explosively; let the working arm stay relaxed and simply ride the momentum.', 'Brace your core to resist rotating toward the loaded side.', 'Complete all your reps on one arm before switching hands for the next set, rather than passing the bell mid-set.'], mistakes:['Letting the torso rotate open toward the working arm.', 'Gripping the handle too tightly, which creeps tension up into the shoulder.'], muscles:['posterior-chain', 'grip', 'core'] },
    { name:'Hand-to-Hand Swing', difficulty:'Intermediate', category:'Hinges', description:'Alternating hands at the apex of the swing.', pattern:'swing', setup:'Start a single-arm swing stance, ready to pass the bell between hands at the top of the arc.', steps:['Perform the hike pass and hip snap exactly as a single-arm swing.', 'At the top of the float, release with one hand and receive with the other without breaking rhythm.', 'Keep the hips squared throughout the hand switch — don’t let the pass twist your torso.'], mistakes:['Reaching across the body to grab the handle, twisting the spine.', 'Slowing the hips down to make the switch easier, losing the ballistic power of the swing.'], muscles:['posterior-chain', 'grip'] },
    { name:'Double Kettlebell Swing', difficulty:'Intermediate', category:'Hinges', description:'Swinging two bells simultaneously with a wider stance.', pattern:'swing', setup:'Wider stance than a single-bell swing, one kettlebell hiked back between your legs in each hand.', steps:['Hike both bells back together, hinging at the hips with a flat back.', 'Drive your hips forward in one explosive motion to float both bells to chest height.', 'Keep both arms even — avoid one bell leading the other.'], mistakes:['Using a stance too narrow for two bells to pass without hitting your legs.', 'Letting one side dominate the drive, twisting the hips.'], requiresTwoBells:true, muscles:['posterior-chain'] },
    { name:'Figure 8s', difficulty:'Beginner', category:'Hinges', description:'Passing the bell hand-to-hand through legs in a figure-8 motion.', pattern:'rotate', setup:'Stand in a quarter-squat with the bell in one hand, knees bent enough to pass the bell underneath them.', steps:['Pass the bell behind one leg to the other hand, weaving it in a figure-8 path through and around your legs.', 'Keep your chest up and back flat throughout — the movement comes from the arms and a stable squat, not the spine.', 'Keep the pace controlled so the handoff between hands is clean each time.'], mistakes:['Standing too tall, which makes the bell path awkward and cramped.', 'Rounding the back to reach for the handoff.'], muscles:['core', 'grip'] },
    { name:'Kettlebell Clean', difficulty:'Intermediate', category:'Hinges', description:'Pulling from the floor and cleanly catching in the front rack.', pattern:'pull', setup:'Same hike-pass setup as a swing, but with the intent to bring the bell into the rack, not float it out front.', steps:['Hike the bell back and drive your hips forward like a swing.', 'Keep the bell close to your body as it rises, guiding it with a slight elbow bend into the front rack.', 'Let the bell rotate around your hand smoothly to “catch” in the rack without it banging your wrist or forearm.', 'Absorb the catch by softening your knees slightly.'], mistakes:['Muscling the bell up and out and away from the body, which causes it to whack the forearm on the way in.', 'Casting the bell out at the top instead of pulling it in close on the way up.'], muscles:['posterior-chain', 'shoulders'] },
    { name:'Kettlebell High Pull', difficulty:'Intermediate', category:'Hinges', description:'Explosive pull ending with the elbow high and close to the body.', pattern:'pull', setup:'Set up as a swing, but the intent is to pull the elbow high and close to the body rather than let the bell float.', steps:['Hike and hip-drive the bell exactly as in a swing.', 'As the bell rises, pull the elbow up and back, keeping the bell close to your body, like starting a upright row mid-air.', 'Let the bell reach roughly chest-to-collarbone height with your elbow above your wrist.'], mistakes:['Pulling with the arm before the hips have finished driving.', 'Letting the elbow drift out to the side instead of staying close and high.'], muscles:['posterior-chain', 'shoulders'] },
    { name:'Kettlebell Snatch', difficulty:'Advanced', category:'Hinges', description:'Launching the bell from the hinge directly overhead in one fluid arc.', pattern:'snatch', setup:'Set up as a swing with the intent to send the bell directly overhead in one continuous motion.', steps:['Hike the bell back and drive your hips forward with full power.', 'Let the bell travel in a straight vertical path close to your body rather than looping out and around.', 'Punch your hand through the handle at the top so the bell rotates around your fist, not into your wrist.', 'Finish with the bell locked out overhead, arm, hips, and legs all extended in one line.'], mistakes:['Muscling the bell up with the shoulder instead of relying on hip drive.', 'Letting the bell smash into the forearm at the top from a loose grip and bad timing.', 'Catching the lockout with a bent elbow instead of a fully locked arm.'], muscles:['posterior-chain', 'shoulders'] },
    { name:'Double Kettlebell Snatch', difficulty:'Advanced', category:'Hinges', description:'Performing the snatch with a bell in each hand.', pattern:'snatch', setup:'Same setup as the single-bell snatch, one kettlebell hiked back in each hand.', steps:['Hike both bells back together and drive your hips forward with equal power on both sides.', 'Let both bells travel straight up close to the body and punch through to lockout together.', 'Land the catch with both arms locked out overhead at the same time.'], mistakes:['One side finishing before the other, throwing off balance at the top.', 'Using a stance too narrow to hike two bells cleanly.'], requiresTwoBells:true, muscles:['posterior-chain', 'shoulders'] },
    { name:'Double Kettlebell High Pull', difficulty:'Advanced', category:'Hinges', description:'Explosively pulling two bells simultaneously high and close to the body.', pattern:'pull', setup:'Set up as a double swing with the intent to pull both elbows high and close to the body.', steps:['Hike both bells back and hip-drive together.', 'Pull both elbows up and back symmetrically as the bells rise to chest height.', 'Keep both bells close to the body throughout the pull.'], mistakes:['One arm pulling higher or faster than the other.', 'Letting the bells swing out away from the body instead of tracking straight up.'], requiresTwoBells:true, muscles:['posterior-chain', 'shoulders'] },
    { name:'Rotational Clean', difficulty:'Advanced', category:'Hinges', description:'Cleaning the kettlebell while pivoting and rotating hips 90 degrees.', pattern:'pull', setup:'Set up in an athletic stance with the bell on the floor to one side of your body.', steps:['Hinge and pull the bell up while pivoting your hips and feet roughly 90 degrees toward the bell.', 'Guide the bell into the front rack as your body finishes rotating to face forward.', 'Keep the motion controlled — this is a coordination drill, not a max-effort pull.'], mistakes:['Twisting through the lower back instead of pivoting the feet and hips together.', 'Rushing the rotation before the bell has actually left the floor.'], muscles:['posterior-chain', 'core', 'shoulders'] },
    { name:'Lateral Kettlebell Swing', difficulty:'Intermediate', category:'Hinges', description:'Swing movement moving across the front of the body laterally.', pattern:'swing', setup:'Standard swing hike-pass stance, but aiming the bell’s path out to the side rather than straight forward.', steps:['Hike the bell back as in a normal swing.', 'Drive the hips forward while redirecting the bell’s arc out to one side at chest height.', 'Keep the core braced to control the extra rotational demand on the spine.'], mistakes:['Letting the lower back twist to create the lateral path instead of redirecting through the arms and hips together.', 'Losing the hip-hinge fundamentals while focused on the new direction.'], muscles:['posterior-chain', 'core'] },
    { name:'Kettlebell Goblet Squat', difficulty:'Beginner', category:'Squats', description:'Holding the bell by the horns at chest height during a deep squat.', pattern:'squat', setup:'Hold the bell by the horns (upside-down against your chest), feet just outside shoulder width.', steps:['Keep your elbows pointed down, tracking just inside your knees as you descend.', 'Sit down and back, keeping your chest tall and heels planted.', 'Squat as deep as your mobility allows, using your elbows against your knees as a gentle guide, then drive back up.'], mistakes:['Letting the heels lift off the floor.', 'Letting the knees cave inward on the way up.', 'Rounding the upper back to keep the bell close.'], muscles:['legs'] },
    { name:'Kettlebell Sumo Squat', difficulty:'Beginner', category:'Squats', description:'Wide stance, toes turned out, squatting with the bell hanging between your legs. Targets adductors and glutes.', pattern:'squat', setup:'Wide stance, toes turned out about 30-45 degrees, kettlebell hanging from both hands between your legs.', steps:['Sit straight down, tracking your knees over your toes.', 'Keep your chest tall and the bell hanging with straight arms, not swinging.', 'Drive through your whole foot to stand, squeezing your glutes and inner thighs at the top.'], mistakes:['Losing the wide stance and squatting narrow.', 'Letting the bell swing rather than staying under control.'], muscles:['legs'] },
    { name:'Kettlebell Forward Lunge', difficulty:'Beginner', category:'Squats', description:'Holding the bell in goblet or rack position, stepping forward into a lunge and pushing back to standing, alternating legs.', pattern:'lunge', setup:'Hold the bell in goblet or single-arm rack position, standing tall.', steps:['Step forward with one leg and lower your back knee straight down toward the floor.', 'Keep your front shin close to vertical and your torso upright.', 'Push off your front foot to return to standing, then alternate legs.'], mistakes:['Letting the front knee travel far past the toes.', 'Taking a step too short, which pitches the torso forward.'], muscles:['legs'] },
    { name:'Racked Squat', difficulty:'Beginner', category:'Squats', description:'Squatting with one bell held in the single-arm front rack.', pattern:'squat', setup:'Clean one kettlebell into the front rack, resting it against your shoulder and chest.', steps:['Keep your elbow tucked and the bell resting on your forearm/shoulder shelf, not held out by the arm.', 'Squat straight down, resisting the urge to lean toward the loaded side.', 'Drive back up, keeping the rack tight through the whole rep.'], mistakes:['Letting the torso tip toward the loaded shoulder.', 'Letting the elbow drift away from the body, which turns the rack into an arm-strength exercise.'], muscles:['legs', 'shoulders'] },
    { name:'Double Front Squat', difficulty:'Intermediate', category:'Squats', description:'Squatting with two bells held in the front rack position.', pattern:'squat', setup:'Clean two kettlebells into the front rack, one at each shoulder.', steps:['Keep both elbows tucked in and the bells resting on your shoulders, not just held by your arms.', 'Squat straight down with a tall chest, knees tracking over your toes.', 'Drive up powerfully through your whole foot.'], mistakes:['Letting the elbows drop, which shifts the load onto the wrists and forearms.', 'Leaning forward because the front-loaded weight pulls the chest down.'], requiresTwoBells:true, muscles:['legs', 'shoulders'] },
    { name:'Racked Reverse Lunge', difficulty:'Intermediate', category:'Squats', description:'Stepping back into a lunge with bell in front rack.', pattern:'lunge', setup:'Clean one bell into the front rack, standing tall.', steps:['Step backward with one leg, lowering the back knee straight down.', 'Keep your torso upright and the rack tight through the whole step.', 'Push through your front heel to return to standing.'], mistakes:['Letting the torso lean toward the loaded side to counterbalance.', 'Taking a step too short to lower the back knee properly.'], muscles:['legs', 'shoulders'] },
    { name:'Tactical Lunge', difficulty:'Intermediate', category:'Squats', description:'Passing the bell hand-to-hand underneath front leg while lunging.', pattern:'lunge', setup:'Stand holding the bell in one hand, ready to pass it under your front leg mid-lunge.', steps:['Step forward into a lunge, lowering your back knee toward the floor.', 'At the bottom, pass the bell underneath your front thigh to the other hand.', 'Drive back up to standing and repeat, alternating the leg and the passing hand.'], mistakes:['Rounding the back to reach the handoff instead of keeping the torso tall.', 'Rushing the pass and losing balance at the bottom of the lunge.'], muscles:['legs', 'core'] },
    { name:'Kettlebell Curtsy Lunge', difficulty:'Intermediate', category:'Squats', description:'Holding the bell in goblet or rack position, stepping one leg diagonally behind the other into a curtsy, then returning to standing. Targets glutes and adductors.', pattern:'lunge', setup:'Hold the bell in goblet or rack position, standing tall.', steps:['Step one leg diagonally behind the other, lowering into a curtsy until your back knee nears the floor.', 'Keep your hips square to the front rather than letting them rotate with the step.', 'Push through your front foot to return to standing.'], mistakes:['Letting the front knee collapse inward.', 'Rotating the hips instead of keeping them squared forward.'], muscles:['legs'] },
    { name:'Cossack Squat', difficulty:'Advanced', category:'Squats', description:'Deep lateral lunge holding the bell at the chest.', pattern:'lunge', setup:'Very wide stance, toes pointed slightly out, holding the bell at your chest.', steps:['Shift your weight to one side, bending that knee deeply while the other leg stays straight, heel down if possible.', 'Keep your chest up and your bent-side heel planted through the movement.', 'Push off the bent leg to shift your weight back to center, then repeat on the other side.'], mistakes:['Letting the bent-knee heel pop up off the floor.', 'Rounding forward at the chest instead of sitting back into the hip.'], muscles:['legs'] },
    { name:'Deck Squat', difficulty:'Advanced', category:'Squats', description:'Rolling back onto shoulders, then rolling forward to stand into a squat.', pattern:'floor', setup:'Sit on the floor holding the bell at your chest, knees bent, feet flat.', steps:['Roll back onto your upper back and shoulders, keeping the bell tight to your chest.', 'Use the momentum of rolling forward to drive your feet down and stand straight up out of the roll.', 'Control the roll back down onto the floor to reset.'], mistakes:['Rolling onto the neck instead of the upper back/shoulders, which is hard on the spine.', 'Trying to muscle up without using the rolling momentum.'], muscles:['legs', 'core'] },
    { name:'Kettlebell Pistol Squat', difficulty:'Advanced', category:'Squats', description:'Single-leg squat with the other leg extended straight out in front, holding a bell in goblet or rack position for balance.', pattern:'squat', setup:'Stand on one leg holding the bell in goblet or extended-arm counterbalance position, other leg extended forward.', steps:['Sit back and down on the standing leg, keeping the extended leg hovering off the floor.', 'Go only as deep as you can control with good form — a partial range is fine while building strength.', 'Drive through the standing heel to return to tall.'], mistakes:['Letting the standing knee cave inward.', 'Going deeper than current strength/mobility allows and losing the bottom position.'], muscles:['legs'] },
    { name:'Overhead Squat', difficulty:'Advanced', category:'Squats', description:'Squatting while keeping a kettlebell locked out overhead with a straight arm.', pattern:'squat', setup:'Press or snatch a bell to lockout overhead before beginning, feet shoulder width.', steps:['Keep the arm locked and the bell stacked directly over your shoulder and hip throughout.', 'Squat down while keeping your eyes forward and the overhead arm vertical.', 'Drive back up without letting the bell drift forward or the elbow bend.'], mistakes:['Letting the arm drift out of the locked, stacked position as you descend.', 'Rushing into depth before you can keep the bell stable overhead.'], muscles:['legs', 'shoulders'] },
    { name:'Kettlebell Floor Press', difficulty:'Beginner', category:'Presses', description:'Lying on back and pressing bell upward.', pattern:'floor', setup:'Lie on your back with knees bent, holding the bell at your chest with a locked wrist.', steps:['Press the bell straight up until your arm is fully locked out over your shoulder.', 'Lower with control until your upper arm touches the floor — let the floor stop the rep, don’t bounce.', 'Keep your wrist stacked directly over your elbow throughout the press.'], mistakes:['Flaring the elbow out to the side instead of pressing in a straight line.', 'Bouncing the upper arm off the floor to gain momentum.'], muscles:['shoulders'] },
    { name:'Strict Overhead Press', difficulty:'Beginner', category:'Presses', description:'Pressing from the rack directly overhead without leg drive.', pattern:'press', setup:'Clean the bell into the front rack, feet about hip width, standing tall.', steps:['Brace your core and glutes hard before starting — no leg drive is allowed.', 'Press straight up, letting your head move slightly back out of the bell’s path, then forward once it clears.', 'Finish with the bell, wrist, elbow, and shoulder stacked directly overhead.', 'Lower back to the rack under control.'], mistakes:['Leaning back excessively to press instead of bracing and pressing straight up.', 'Letting the bell drift forward instead of finishing stacked over the shoulder.'], muscles:['shoulders'] },
    { name:'Push Press', difficulty:'Intermediate', category:'Presses', description:'Using a slight leg dip and drive to help push overhead.', pattern:'press', setup:'Clean the bell into the front rack, feet hip width.', steps:['Dip straight down a few inches by bending your knees, keeping your torso upright.', 'Drive up explosively through your legs and use that momentum to punch the bell overhead.', 'Lock the arm out fully at the top, then lower back to the rack.'], mistakes:['Dipping forward instead of straight down, which sends the bell off-path.', 'Relying entirely on the arm and skipping the leg drive that makes this press efficient.'], muscles:['shoulders', 'legs'] },
    { name:'Half-Kneeling Press', difficulty:'Intermediate', category:'Presses', description:'Pressing overhead from a half-kneeling position, with one knee down and the opposite foot planted.', pattern:'press', setup:'Kneel with one knee down, the opposite foot planted flat in front, bell racked on the same side as the down knee.', steps:['Squeeze your glutes on both sides to lock your hips square and stable.', 'Press straight up without leaning to either side or arching your lower back.', 'Lower back to the rack with control, keeping the tall, stable torso.'], mistakes:['Letting the hips rotate or tilt during the press.', 'Arching the lower back to gain a few extra inches of press.'], muscles:['shoulders', 'core'] },
    { name:'Single-Arm Thruster', difficulty:'Intermediate', category:'Presses', description:'Front squat transitioning instantly into a push press.', pattern:'thruster', setup:'Clean the bell into the front rack, feet just outside shoulder width.', steps:['Squat down while keeping the rack tight and your chest tall.', 'As you drive up out of the bottom of the squat, use that momentum to press the bell overhead in one continuous motion.', 'Finish with hips, knees, and the pressing arm all fully extended.'], mistakes:['Pausing between the squat and the press instead of linking them into one motion.', 'Letting the torso lean away from the loaded side during the press.'], muscles:['shoulders', 'legs'] },
    { name:'Single-Arm Clean & Press', difficulty:'Intermediate', category:'Presses', description:'Clean the bell to the rack, then press it overhead in a separate, controlled phase.', pattern:'pull', setup:'Set up as for a clean; pause to reset and brace once the bell reaches the rack, then press.', steps:['Clean the bell into the front rack using hip drive, not an arm curl.', 'Reset your breath and brace, then press straight overhead to lockout.', 'Lower back to the rack, then all the way back down to the floor or hang, and repeat.'], mistakes:['Curling the bell up into the rack with the arm instead of using the hip pull.', 'Pressing before you’ve actually stabilized the rack position.'], muscles:['shoulders', 'posterior-chain'] },
    { name:'Kettlebell Jerk', difficulty:'Advanced', category:'Presses', description:'A quick leg dip-drive sends the bell upward, then a second dip drops you under it to catch overhead with a locked arm.', pattern:'jerk', setup:'Start with the bell in the front rack, feet hip width.', steps:['Dip straight down a few inches, then drive up hard to send the bell just off your shoulder.', 'As the bell reaches its highest point, quickly drop your hips down and back under it, catching it locked out overhead with feet shifted to a comfortable split or shoulder-width stance.', 'Stand tall to finish, then reverse the steps to return the bell to the rack.'], mistakes:['Pressing the bell up with the arm instead of dip-driving it with the legs.', 'Catching with a bent elbow instead of a fully locked-out arm.'], muscles:['shoulders', 'legs'] },
    { name:'Double Clean & Jerk', difficulty:'Advanced', category:'Presses', description:'Clean two bells to the rack, then jerk them overhead.', pattern:'jerk', setup:'Clean two bells into the front rack together, feet hip width.', steps:['Dip straight down with both bells racked evenly, then drive up to send both bells slightly upward.', 'Drop under both bells at once, catching them locked out overhead with feet re-set for stability.', 'Stand tall to finish, keeping both arms even.'], mistakes:['One bell finishing higher or later than the other.', 'Uneven foot re-set under the bells, throwing off balance at the catch.'], requiresTwoBells:true, muscles:['shoulders', 'legs', 'posterior-chain'] },
    { name:'Sots Press', difficulty:'Advanced', category:'Presses', description:'Strict overhead press while holding a deep squat.', pattern:'press', setup:'Squat all the way down holding the bell in the rack, staying in the bottom position for the whole set.', steps:['From the bottom of the squat, press the bell straight overhead without standing up.', 'Keep your torso as upright as possible in the bottom position throughout the press.', 'Lower back to the rack while staying in the squat.'], mistakes:['Standing up partway to make the press easier — the point is pressing from the bottom.', 'Letting the torso collapse forward in the deep squat position.'], muscles:['shoulders', 'legs', 'core'] },
    { name:'Bottoms-Up Press', difficulty:'Advanced', category:'Presses', description:'Pressing overhead while holding the bell upside down by the handle.', pattern:'press', setup:'Hold the bell upside down by the handle, base pointing at the ceiling, gripped hard.', steps:['Squeeze the handle as hard as you can — grip tension is what keeps the bell from tipping.', 'Press straight up slowly and with control, keeping the base stacked over your wrist.', 'Lower with the same control, never letting the bell wobble out of vertical.'], mistakes:['Gripping too loosely, which lets the bell tip over.', 'Rushing the press instead of moving slowly enough to keep the bell balanced.'], muscles:['shoulders', 'grip'] },
    { name:'Double Kettlebell Thruster', difficulty:'Advanced', category:'Presses', description:'Heavy double front squat into double overhead press.', pattern:'thruster', setup:'Clean two bells into the front rack, feet just outside shoulder width.', steps:['Squat down with both bells racked, chest tall.', 'Drive up out of the bottom and use that momentum to press both bells overhead together.', 'Finish with hips, knees, and both arms fully extended.'], mistakes:['One arm lagging behind the other during the press.', 'Breaking the squat and press into two separate paused movements instead of one fluid one.'], requiresTwoBells:true, muscles:['shoulders', 'legs'] },
    { name:'See-Saw Press', difficulty:'Advanced', category:'Presses', description:'Holding two bells in rack, pressing one up while pulling the other down.', pattern:'press', setup:'Clean two bells into the front rack.', steps:['Press one bell overhead while simultaneously lowering the other back to the rack.', 'Keep your core braced to resist rotating as the bells move in opposite directions.', 'Alternate smoothly, one bell always moving up as the other comes down.'], mistakes:['Letting the torso twist to help the press instead of staying braced and square.', 'Losing rhythm and pausing with both bells at the same height.'], requiresTwoBells:true, muscles:['shoulders', 'core'] },
    { name:'Single-Arm Kettlebell Row', difficulty:'Beginner', category:'Rows', description:'Bent-over row pulling to the hip.', pattern:'row', setup:'Hinge forward at the hips, flat back, bell hanging from one hand.', steps:['Brace your core to keep your torso still and square to the floor.', 'Pull your elbow straight up and back, driving it past your ribs, bell finishing near your hip.', 'Lower with control back to a full arm extension.'], mistakes:['Rotating the torso to help the pull instead of keeping it square.', 'Shrugging the shoulder up toward the ear instead of driving the elbow back.'], muscles:['back', 'grip', 'core'] },
    { name:'Double Kettlebell Bent-Over Row', difficulty:'Beginner', category:'Rows', description:'Hinging forward and rowing two bells to the hips at the same time, keeping a flat back throughout.', pattern:'row', setup:'Hinge forward at the hips with a flat back, one bell hanging from each hand.', steps:['Brace your core hard — this position is demanding on the lower back.', 'Pull both elbows straight up and back together, bells finishing near your hips.', 'Lower both with control back to full extension without letting the back round.'], mistakes:['Letting the back round under the load of two bells.', 'Standing the torso up a bit more each rep to make the pull easier ("cheating" the hinge).'], requiresTwoBells:true, muscles:['back', 'grip'] },
    { name:'Kettlebell Upright Row', difficulty:'Beginner', category:'Rows', description:'Pulling the bell straight up along your body to chest height, leading with the elbows.', pattern:'row', setup:'Stand tall holding the bell with both hands in front of your thighs.', steps:['Pull the bell straight up along your body, leading with your elbows.', 'Let your elbows travel out and up above wrist height, bell finishing around chest/collarbone height.', 'Lower with control back to the starting position.'], mistakes:['Pulling the bell out away from the body instead of straight up along it.', 'Shrugging instead of leading with the elbows.'], muscles:['shoulders'] },
    { name:'Tactical Row', difficulty:'Intermediate', category:'Rows', description:'Rowing the bell to your hip from a staggered, athletic stance — one foot forward, one back — building rotational core stability alongside pulling strength.', pattern:'row', setup:'Staggered stance, one foot forward, one back, hinged slightly forward, bell hanging from one hand.', steps:['Brace your core to resist rotating in the staggered stance.', 'Pull your elbow straight up and back, bell finishing near your hip.', 'Lower with control, keeping the athletic, staggered base stable throughout.'], mistakes:['Letting the back leg’s heel pop up and destabilize the stance.', 'Rotating the torso toward the working arm instead of staying square.'], muscles:['back', 'core'] },
    { name:'Gorilla Row', difficulty:'Intermediate', category:'Rows', description:'Alternating rows from a deep hinge with two bells on the floor.', pattern:'row', setup:'Deep hinge with two bells on the floor between your feet, gripping both handles.', steps:['Keeping one hand down for support, pull the other bell straight up to your hip.', 'Set that bell back down with control, then repeat on the other side.', 'Keep your back flat throughout — the deep hinge makes this demanding on the low back if it rounds.'], mistakes:['Rounding the back in the deep hinge position.', 'Rushing the alternating tempo and losing control of the set-down.'], requiresTwoBells:true, muscles:['back', 'grip'] },
    { name:'Kettlebell Pullover', difficulty:'Beginner', category:'Rows', description:'Lying on your back with knees bent, lowering the bell in an arc from overhead to above your chest to engage the lats and core.', pattern:'floor', setup:'Lie on your back with knees bent, holding the bell with both hands extended above your chest.', steps:['Brace your core to keep your lower back from arching off the floor.', 'Keeping your arms mostly straight, lower the bell in an arc back behind your head.', 'Reverse the arc, pulling the bell back over your chest using your lats.'], mistakes:['Letting the lower back arch up off the floor as the bell goes overhead.', 'Bending the elbows a lot, which turns it into a triceps movement instead of a lat stretch/pull.'], muscles:['back', 'core'] },
    { name:'Kettlebell Renegade Row', difficulty:'Intermediate', category:'Rows', description:'Planking on two bells and alternating rows.', pattern:'row', setup:'Plank position with one hand on each kettlebell handle, feet set wide for stability.', steps:['Brace your core and glutes hard to keep your hips from rocking side to side.', 'Pull one bell straight up to your hip while the other arm stays locked, supporting your weight.', 'Set it down with control, then row the other side.'], mistakes:['Letting the hips rotate open toward the rowing arm.', 'Rushing the tempo, which turns the plank into a wobble.'], requiresTwoBells:true, muscles:['back', 'core', 'shoulders'] },
    { name:'Kettlebell Batwing Hold', difficulty:'Intermediate', category:'Rows', description:'Holding two bells in a bent-over position near the ribs with shoulder blades pinched together, building upper-back and grip endurance.', pattern:'row', setup:'Bent over at the hips with a flat back, holding a bell in each hand pulled up near your ribs.', steps:['Pin your shoulder blades together and hold both bells tight to your body.', 'Keep breathing steadily while maintaining the hinge and the pulled-back shoulder position.', 'Hold for the prescribed time, resisting the urge to let the back round as fatigue sets in.'], mistakes:['Letting the back round as the hold gets hard — better to end the set than lose the flat back.', 'Letting the shoulder blades relax apart instead of staying pinned.'], requiresTwoBells:true, muscles:['back', 'shoulders'] },
    { name:'Kettlebell Slingshot', difficulty:'Beginner', category:'Core', description:'Passing the bell hand-to-hand around your waist.', pattern:'rotate', setup:'Stand tall holding the bell by the horns in one hand at your waist.', steps:['Pass the bell around your waist from one hand to the other, letting it travel behind your back.', 'Keep your core braced and hips facing forward — the bell circles you, not the other way around.', 'Reverse direction after your set to work both sides evenly.'], mistakes:['Letting the torso twist to chase the bell around instead of staying still.', 'Losing grip tension right at the handoff behind the back.'], muscles:['core', 'grip'] },
    { name:'Kettlebell Halo', difficulty:'Beginner', category:'Core', description:'Circling the bell around head and neck.', pattern:'rotate', setup:'Stand tall holding the bell upside down by the horns at chest/chin height.', steps:['Circle the bell around your head, staying close to your skull without bumping it.', 'Keep your core braced and ribs down — avoid arching your back as the bell passes behind your head.', 'Reverse direction each set to work both rotational directions evenly.'], mistakes:['Leaning the head forward to “duck under” the bell instead of keeping it still.', 'Letting the ribs flare and the back arch as the bell passes overhead.'], muscles:['shoulders', 'core'] },
    { name:'Half-Kneeling Halo', difficulty:'Beginner', category:'Core', description:'Standard halo while in a lunge position with one knee on floor.', pattern:'rotate', setup:'Kneel with one knee down, opposite foot planted, holding the bell at chest height.', steps:['Circle the bell around your head exactly as in a standing halo.', 'Keep your hips square and stable in the half-kneeling stance throughout.', 'Reverse direction to complete work on both sides.'], mistakes:['Letting the torso lean or the hips shift to help the bell around.', 'Rushing the circle instead of keeping it slow and controlled.'], muscles:['shoulders', 'core'] },
    { name:'Kettlebell Russian Twist', difficulty:'Beginner', category:'Core', description:'Sitting on floor with feet elevated, rotating bell side to side.', pattern:'rotate', setup:'Sit on the floor with knees bent, leaning back slightly, holding the bell at your chest, feet lifted if able.', steps:['Rotate your torso to tap the bell on the floor beside one hip.', 'Rotate through to the other side, keeping the motion coming from your core, not just your arms.', 'Keep your chest lifted throughout — don’t let your back round as you fatigue.'], mistakes:['Letting the arms do the twisting while the torso stays still.', 'Rounding the lower back as the set gets harder.'], muscles:['core'] },
    { name:'Kettlebell Sit-Up', difficulty:'Beginner', category:'Core', description:'Lying on your back holding the bell at your chest, sitting up under control and lowering back down.', pattern:'floor', setup:'Lie on your back, knees bent, feet flat, holding the bell at your chest.', steps:['Curl your torso up and forward, keeping the bell close to your chest the whole way.', 'Sit all the way up to a tall position, then lower back down under control.', 'Keep your neck relaxed — lead with your chest, not your chin.'], mistakes:['Yanking the bell to build momentum instead of using your abs.', 'Letting the feet fly up off the floor to help the sit-up along.'], muscles:['core'] },
    { name:'Kettlebell Side Bend', difficulty:'Beginner', category:'Core', description:'Standing with a bell in one hand, bending sideways at the waist and returning to standing. Targets the obliques.', pattern:'rotate', setup:'Stand tall with the bell in one hand at your side.', steps:['Bend directly sideways at the waist, letting the bell slide down toward your knee.', 'Keep your torso facing forward the whole time — this is a pure side bend, not a twist.', 'Squeeze your obliques to pull back up to tall.'], mistakes:['Twisting the torso forward or backward instead of bending straight to the side.', 'Using momentum to bounce back up instead of controlling it with your obliques.'], muscles:['core'] },
    { name:"Farmer's Walk", difficulty:'Beginner', category:'Carries', description:'Walking with a bell in each hand by your sides.', pattern:'carry', setup:'Stand tall holding a bell in each hand at your sides.', steps:['Brace your core and set your shoulders back and down before you start walking.', 'Take controlled steps, keeping your torso upright and the bells still — no swinging.', 'Keep your grip locked in for the full distance or time.'], mistakes:['Letting the shoulders round forward and up toward the ears as grip fatigues.', 'Taking steps that are too long, which makes the torso sway.'], muscles:['grip', 'core'] },
    { name:'Suitcase Walk', difficulty:'Beginner', category:'Carries', description:'Walking with a bell in only one hand.', pattern:'carry', setup:'Stand tall holding one bell at your side.', steps:['Brace your core hard to resist leaning toward the loaded side.', 'Walk with even, controlled steps, keeping both shoulders level.', 'Switch sides for the next set to train both directions evenly.'], mistakes:['Letting the torso tip toward the kettlebell instead of staying vertical.', 'Shrugging the loaded shoulder up to compensate.'], muscles:['grip', 'core'] },
    { name:'Rack Carry', difficulty:'Beginner', category:'Carries', description:'Walking while holding bells in the front rack position.', pattern:'carry', setup:'Clean one or two bells into the front rack, standing tall.', steps:['Keep your elbow(s) tucked and the bell resting on your shoulder shelf, not just held by the arm.', 'Walk with controlled, even steps, keeping your torso upright.', 'Breathe steadily — the front rack position can restrict breathing if you tense up.'], mistakes:['Letting the rack drift away from the shoulder, turning it into a static arm hold.', 'Leaning back to counterbalance the front load.'], muscles:['shoulders', 'core'] },
    { name:"Kettlebell Waiter's Walk", difficulty:'Intermediate', category:'Carries', description:'Walking while holding a bell locked out overhead in one hand, bracing the core to keep the arm stacked over the shoulder.', pattern:'carry', setup:'Press one bell to lockout overhead before you start walking.', steps:['Keep your arm locked and the bell stacked directly over your shoulder throughout.', 'Walk with small, controlled steps, keeping your ribs down and core braced.', 'Switch arms between sets to train both sides.'], mistakes:['Letting the arm drift forward out of the stacked position.', 'Arching the lower back to help hold the bell up.'], muscles:['shoulders', 'core'] },
    { name:'Overhead March', difficulty:'Intermediate', category:'Carries', description:'Walking or marching in place with bell locked overhead.', pattern:'carry', setup:'Press one or two bells to lockout overhead, feet hip width.', steps:['Keep the arm(s) locked and stacked overhead throughout.', 'Lift one knee to hip height at a time, marching in place with control.', 'Keep your core braced so the overhead position doesn’t pull you off balance as you lift each knee.'], mistakes:['Letting the bell drift forward as you march.', 'Rushing the tempo instead of controlling each knee lift.'], muscles:['shoulders', 'core'] },
    { name:'Plank Drags', difficulty:'Intermediate', category:'Core', description:'Dragging bell laterally underneath body while in push-up plank.', pattern:'floor', setup:'Start in a push-up plank with the kettlebell to one side, just outside your hand.', steps:['Brace your core and glutes to keep your hips still and level.', 'Reach under your body with the opposite hand and drag the bell across to the other side.', 'Reset your hand under your shoulder and repeat, dragging it back the other way.'], mistakes:['Letting the hips rotate or sag as you reach for the bell.', 'Placing the hands too narrow, which makes the reach unstable.'], muscles:['core', 'shoulders'] },
    { name:'Kettlebell Windmill', difficulty:'Intermediate', category:'Core', description:'Bell locked overhead in one hand while you hinge sideways at the hips, reaching the free hand toward the floor and keeping your eyes on the bell.', pattern:'rotate', setup:'Press one bell to lockout overhead, feet turned slightly away from the working side.', steps:['Keep your eyes on the bell and the arm locked throughout the movement.', 'Hinge sideways at the hips, reaching your free hand down toward the floor along your leg.', 'Keep the overhead arm stacked vertically above your shoulder the entire way down and back up.'], mistakes:['Letting the overhead arm drift forward instead of staying stacked.', 'Bending the front knee a lot, which turns the hip hinge into a squat.'], muscles:['shoulders', 'core'] },
    { name:'Turkish Get-Up', difficulty:'Advanced', category:'Core', description:'Complex floor-to-standing sequence with bell locked overhead.', pattern:'getup', setup:'Lie on your back holding the bell locked out overhead in one hand, same-side knee bent, foot flat on the floor.', steps:['Keep your eyes on the bell and the arm locked overhead for the entire sequence.', 'Press through your planted foot and opposite elbow to sit up, then post up onto your hand.', 'Bridge your hips up and sweep your back leg through into a kneeling lunge, then drive up to standing, bell still locked overhead.', 'Reverse the entire sequence step by step to return to the floor.'], mistakes:['Losing eye contact with the bell, which is often the first sign the arm is about to drift.', 'Rushing between steps instead of pausing to confirm each position is stable.', 'Letting the locked arm bend even slightly under fatigue.'], muscles:['shoulders', 'core'] },
    { name:"Bottoms-Up Waiter's Walk", difficulty:'Advanced', category:'Carries', description:'Carrying bell upside down by handle, locked out overhead.', pattern:'carry', setup:'Hold the bell upside down by the handle, locked out overhead, base pointing at the ceiling.', steps:['Grip the handle hard — that tension is what keeps the bell from tipping over.', 'Walk with small, controlled steps, keeping the arm locked and stacked overhead.', 'Switch arms between sets, resetting your grip fully each time.'], mistakes:['Gripping too loosely and letting the bell wobble or tip.', 'Rushing the pace instead of moving slowly enough to stay balanced.'], muscles:['shoulders', 'grip'] },
    { name:'Figure 8 to a Hold', difficulty:'Advanced', category:'Core', description:'Passing bell through legs and catching at chest height in a static hold.', pattern:'rotate', setup:'Stand in a quarter squat with the bell in one hand, ready to pass it through your legs.', steps:['Pass the bell in a figure-8 path around and through your legs, same as the standard Figure 8s.', 'On your final pass, catch the bell with both hands at chest height and stop there.', 'Hold that chest-height position steady for the prescribed time before releasing.'], mistakes:['Standing up out of the squat to make the hold easier.', 'Letting the back round to catch the final pass instead of staying in the squat.'], muscles:['core', 'grip'] },
    { name:'Single-Arm Kettlebell Deadlift', difficulty:'Beginner', category:'Hinges', description:'Unilateral hinge holding one bell in a single hand at your side.', pattern:'hinge', setup:'Stand with feet hip-width apart, kettlebell on the floor a few inches outside one foot.', steps:['Push your hips back and hinge forward, reaching for the handle with the hand on the same side as the bell.', 'Grip the handle, pull your shoulder back and down, and take the slack out of your arm before pulling.', 'Drive through your whole foot and snap your hips forward to stand tall, keeping your torso square to the front.', 'Reverse the motion under control, hips back first, then complete your reps before switching sides.'], mistakes:['Letting the torso twist or lean toward the loaded side instead of staying square.', 'Rounding the lower back instead of hinging at the hips.', 'Rushing the side switch without resetting your stance and grip.'], muscles:['posterior-chain', 'core', 'grip'] },
    { name:'Kettlebell Side Squat', difficulty:'Beginner', category:'Squats', description:'Lateral squat pattern shifting your weight side to side while holding the bell at your chest.', pattern:'squat', setup:'Stand tall with feet wider than shoulder width, holding the bell at your chest with both hands.', steps:['Shift your weight into one leg, pushing your hips back and bending that knee while the other leg stays straight.', 'Keep your chest up and the bell close to your body as you sit into the squat.', 'Drive back up to center through the bent leg, then repeat toward the other side.'], mistakes:['Letting the bent knee cave inward instead of tracking over the toes.', 'Letting the straight leg turn out instead of keeping that foot flat and pointed forward.', 'Rounding forward instead of keeping the chest tall through the shift.'], muscles:['legs'] },
    { name:'Kettlebell Front Raise', difficulty:'Beginner', category:'Presses', description:'Raising the bell straight out in front to shoulder height to build shoulder control.', pattern:'raise', setup:'Stand tall holding the bell by the horns with both hands in front of your thighs.', steps:['Keeping your arms straight but not locked, raise the bell out in front of you to shoulder height.', 'Pause briefly at the top, keeping your shoulders down away from your ears.', 'Lower the bell back down under control instead of dropping it.'], mistakes:['Using momentum from the hips or lower back to swing the bell up.', 'Raising the bell above shoulder height, which shifts the load onto the neck and traps.', 'Shrugging the shoulders up toward the ears during the lift.'], muscles:['shoulders'] },
    { name:'Kettlebell Around-the-Body Pass', difficulty:'Beginner', category:'Core', description:'Passing the bell hand to hand in a full circle around your waist.', pattern:'rotate', setup:'Stand tall holding the bell in one hand at waist height.', steps:['Pass the bell behind your back to your other hand, rotating your torso slightly to make the handoff.', 'Continue circling the bell all the way around your waist, staying tall through your spine.', 'Complete your reps in one direction, then reverse to circle the other way.'], mistakes:['Bending forward at the waist to reach for the handoff instead of staying upright.', 'Rushing the pass and losing grip on the handle.'], muscles:['core', 'grip'] },
    { name:'Kettlebell Toe Touch', difficulty:'Beginner', category:'Core', description:'Lying on your back reaching the bell toward your toes to work the upper abs.', pattern:'floor', setup:'Lie on your back with legs raised straight up toward the ceiling, holding the bell in both hands above your chest.', steps:['Curl your shoulders and upper back off the floor, reaching the bell toward your toes.', 'Keep your legs still and mostly straight throughout the movement.', 'Lower back down under control, keeping tension in your abs the whole way.'], mistakes:['Yanking the bell upward using momentum instead of squeezing the abs.', 'Letting the legs drop or sway to help the reach.', 'Pulling on the neck instead of leading with the chest.'], muscles:['core'] },
    { name:'Double Kettlebell Strict Press', difficulty:'Intermediate', category:'Presses', description:'Pressing two bells overhead at once with no leg drive.', pattern:'press', setup:'Clean two bells into the front rack together, feet hip width, core braced.', steps:['Press both bells straight up at the same time, without dipping the knees to help.', 'Keep your ribs pulled down and avoid arching your lower back as the bells pass your face.', 'Lock both elbows out evenly at the top, then lower back to the rack with control.'], mistakes:['Leaning back and arching the lower back to muscle the bells past the sticking point.', 'One arm finishing the lockout before the other instead of pressing evenly.'], requiresTwoBells:true, muscles:['shoulders', 'core'] },
    { name:'Two-Handed Kettlebell Row', difficulty:'Beginner', category:'Rows', description:'Rowing a single bell to the chest with both hands on the handle.', pattern:'row', setup:'Hinge forward at the hips, flat back, both hands gripping the horns of one bell hanging below you.', steps:['Brace your core to keep your torso still and square to the floor.', 'Pull the bell straight up toward your lower chest, driving both elbows back and up together.', 'Squeeze your shoulder blades together at the top, then lower with control back to full extension.'], mistakes:['Rounding the back to yank the bell up instead of pulling with control.', 'Letting the elbows flare out wide instead of tracking back along the body.'], muscles:['back', 'core'] },
    { name:'Bear Hug Carry', difficulty:'Beginner', category:'Carries', description:'Walking while hugging the bell against your chest with both arms.', pattern:'carry', setup:'Wrap both arms around the bell and hug it tight against your chest, standing tall.', steps:['Brace your core to resist leaning back under the front-loaded weight.', 'Walk with controlled, even steps, keeping the bell pulled in tight against your chest.', "Keep your torso upright the whole way \u2014 don't let the bell ride low onto your stomach."], mistakes:['Letting the bell slide down to rest on the stomach instead of staying hugged high on the chest.', 'Leaning back to counterbalance the front load instead of bracing the core.'], muscles:['core'] },
    { name:'Kettlebell Dead Bug Hold', difficulty:'Beginner', category:'Core', description:'Holding the bell overhead on your back while keeping your lower back flat.', pattern:'floor', setup:'Lie on your back, knees bent and lifted so your shins are parallel to the floor, holding the bell with both hands straight above your chest.', steps:['Press your lower back flat into the floor and keep it pinned there for the whole hold.', 'Hold the bell steady overhead without letting your rib cage flare up.', "Breathe normally throughout \u2014 don't hold your breath to keep the position."], mistakes:['Letting the lower back arch off the floor, which is the exact fault this drill is meant to eliminate.', 'Holding the breath instead of breathing through the brace.'], muscles:['core'] },
    { name:'Dead-Stop Swing', difficulty:'Intermediate', category:'Hinges', description:'Swing done as single dead-stop reps, re-hiking from the floor each time instead of flowing continuously.', pattern:'swing', setup:'Set the bell on the floor between your feet, hinge down to it, both hands on the horns, shoulders packed.', steps:['Hike the bell back hard from a complete stop, keeping the upper body passive \u2014 the power comes from the hips, not the arms.', 'Drive your hips forward explosively to send the bell to chest height, squeezing glutes and abs hard at the top.', 'Let the bell fall back through your legs under control, then finish the rep by parking it fully back down on the floor before resetting the hinge for the next one.'], mistakes:['Standing up between reps instead of staying loaded in the hinge to reset.', 'Rushing the hike and skipping the full reload of the hips, turning it into a shallow mini-swing.'], muscles:['posterior-chain', 'core'] },
    { name:'Kettlebell Squat Clean', difficulty:'Advanced', category:'Hinges', description:'Clean caught in a full squat instead of standing, for moving heavier weight into the rack.', pattern:'squat', setup:'Same hike-pass setup as a swing or standard clean, with the intent to catch the bell in a full squat.', steps:['Hike the bell back and drive your hips forward explosively, same as a swing.', 'As the bell goes weightless near the top of the pull, slide your hand down to the handle and drop straight down into a full squat to meet it.', 'Catch the bell in the rack at chest height as you land in the bottom of the squat, then drive back up to standing.'], mistakes:['Letting the knees cave or travel far past the toes on the drop into the squat.', 'Arching or rounding the back on the way down instead of staying tight through the catch.'], muscles:['posterior-chain', 'legs', 'core'] },
    { name:'Overhead Reverse Lunge', difficulty:'Advanced', category:'Squats', description:'Reverse lunge performed while holding the bell locked out overhead.', pattern:'lunge', setup:'Press the bell to a locked-out overhead position in one hand before you start, shoulder packed and engaged.', steps:['Step straight back into a reverse lunge with the leg on the same side as the loaded arm, keeping your eyes forward and ribs pulled down.', "Lower under control until your back knee is just off the floor, without letting the bell drift sideways or your lower back arch.", 'Drive through your front heel to return to standing, keeping the arm locked out overhead the entire time.'], mistakes:['Letting the elbow unlock or the bell drift away from a stacked position over the shoulder.', 'Arching the lower back to keep the bell balanced instead of bracing the core and keeping ribs down.'], muscles:['shoulders', 'legs', 'core'] },
    { name:'Goblet Clean', difficulty:'Beginner', category:'Hinges', description:'Two-handed clean caught in a goblet hold at the chest, the easiest way to learn the pull-and-catch pattern.', pattern:'pull', setup:'Same hike-pass setup as a two-handed swing, both hands on the horns, ready to pull the bell up rather than swing it out.', steps:['Hike the bell back and drive your hips forward explosively, same as a swing.', 'As the bell rises, let it rotate around your hands and guide it into a goblet hold at your chest, elbows tucked in.', 'Absorb the catch by softening your knees slightly, then reset for the next rep.'], mistakes:['Muscling the bell up with the arms instead of letting the hip drive do the work.', 'Letting the bell bang into the wrists or forearms on the catch instead of guiding it in close.'], muscles:['posterior-chain', 'core'] },
    { name:'Kickstand Suitcase Deadlift', difficulty:'Beginner', category:'Hinges', description:'Suitcase deadlift with the back foot up on its toes, building single-leg strength with a built-in balance assist.', pattern:'hinge', setup:'Stand with the bell on the floor at the outside of one foot, back foot rocked up onto its toes just behind you, hips square to the front.', steps:['Hinge at the hips and reach down for the handle, keeping the back toe lightly grounded for balance rather than pushing through it.', 'Brace your core hard to resist leaning toward the loaded side or letting your hips rotate open.', 'Drive through the front foot to stand tall, then lower with control, hips back first.'], mistakes:['Letting the hips rotate or open up instead of staying square to the front the whole rep.', 'Pushing weight into the back toe instead of using it only as a light balance reference.'], muscles:['posterior-chain', 'core', 'grip'] },
    { name:'Half-Snatch', difficulty:'Advanced', category:'Hinges', description:'Snatch pulled down under control into the rack instead of dropped back to the hike position.', pattern:'snatch', setup:'Set up as a snatch, with the intent to catch the descent in the rack instead of dropping straight back to the hike.', steps:['Hike the bell back and drive your hips forward with full power, same as a snatch.', 'Punch your hand through the handle at the top so the bell rotates around your fist into a locked-out overhead position.', 'Pull the bell down under control into the front rack, like the negative of a press, instead of letting it drop ballistically.'], mistakes:['Letting the bell fall freely into the rack instead of controlling the descent.', 'Catching the overhead lockout with a bent elbow instead of a fully locked arm.'], muscles:['posterior-chain', 'shoulders'] },
    { name:'Bulgarian Split Squat', difficulty:'Advanced', category:'Squats', description:'Rear-foot-elevated split squat holding the bell in one hand at your side.', pattern:'lunge', setup:'Stand a couple feet in front of a bench or step, rear foot up on it with just your toes touching, kettlebell hanging at your side.', steps:['Bend both knees to lower straight down until your back knee is just short of the floor, keeping the bell hanging still at your side.', 'Keep most of your weight in the front foot \u2014 the back foot is a light kickstand, not a second leg to push through.', 'Drive through the front heel to stand back up, keeping your torso upright the whole way.'], mistakes:['Letting the front knee drift far past the toes or cave inward on the way down.', 'Pushing off the back foot to help stand up instead of doing the work with the front leg.'], muscles:['legs', 'core'] }
  ];

  // Exercises that require two kettlebells; everything else works with one.
  var TWO_BELL_EXERCISES = [
    'Double Kettlebell Swing', 'Double Kettlebell Snatch', 'Double Kettlebell High Pull',
    'Double Front Squat', 'Double Clean & Jerk', 'Double Kettlebell Thruster',
    'See-Saw Press', 'Gorilla Row', 'Kettlebell Renegade Row', "Farmer's Walk",
    'Double Kettlebell Bent-Over Row', 'Kettlebell Batwing Hold'
  ];
  EXERCISES.forEach(function(e){ e.requiresTwoBells = TWO_BELL_EXERCISES.indexOf(e.name) !== -1; });

  function shuffled(list){
    var copy = list.slice();
    for (var i = copy.length - 1; i > 0; i--){
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = copy[i]; copy[i] = copy[j]; copy[j] = tmp;
    }
    return copy;
  }

  // Every exercise carries a `muscles` tag (1-3 of: shoulders, posterior-chain, legs,
  // back, core, grip) marking what it actually loads - independent of category, since
  // category alone doesn't capture this: a Press, an overhead Carry, and a Core get-up
  // are three different categories that can all be heavily shoulder-dominant. Capping how
  // many picks in one flow can share a tag is what keeps "one per category" from still
  // producing a session that hammers the same joint three times over.
  //
  // Caps are per-muscle, not one flat number, because these tags aren't equally "risky."
  // Shoulders is the actual reported problem (repeated overhead/rack work across
  // unrelated categories reads as a bad, joint-punishing session) so it stays tight.
  // Core and grip show up as a secondary tag on a large fraction of the whole library
  // (nearly anything unilateral engages grip; nearly anything standing engages core) -
  // treating those at the same strictness as shoulders would fight the generator into a
  // corner for no real benefit, since mild, broad core/grip engagement across a flow is
  // normal and isn't what testers experience as "saturated."
  var DEFAULT_MUSCLE_CAP = 3;
  var MUSCLE_CAPS = { shoulders: 2, core: 4, grip: 3 };
  function muscleCap(muscle){ return MUSCLE_CAPS.hasOwnProperty(muscle) ? MUSCLE_CAPS[muscle] : DEFAULT_MUSCLE_CAP; }

  // Ballistic movements (explosive, hip-driven, high CNS/fatigue cost) vs. grinds
  // (controlled, slower strength work) is a real coaching axis, not just a muscle-tag
  // question - StrongFirst's own flagship template (Simple & Sinister) deliberately pairs
  // exactly ONE ballistic movement with grinds, not several. Two Advanced ballistic moves
  // can legally coexist under MUSCLE_CAPS (e.g. a Snatch + a Clean & Jerk both land at
  // exactly the shoulders cap of 2, not over it) even though stacking them reads as a
  // needlessly brutal session - this is a separate cap for that separate problem.
  // Derived from `pattern`, since that's already on every exercise; classified from the
  // patterns actually in use (see kettlebell-exercise-tools list) - swing/snatch/jerk/
  // thruster/pull are the explosive family, everything else (including the merely-hinging
  // deadlift patterns) is a controlled grind or its own thing (carries).
  var BALLISTIC_PATTERNS = { swing: true, snatch: true, jerk: true, thruster: true, pull: true };
  var BALLISTIC_CAP = 1;
  function isBallistic(exercise){
    if (BALLISTIC_PATTERNS.hasOwnProperty(exercise.pattern)) return true;
    // Kettlebell Squat Clean is the same explosive hip-pull-and-catch family as Kettlebell
    // Clean (pattern 'pull') - it's just tagged pattern 'squat' to reflect its squat catch.
    if (exercise.name === 'Kettlebell Squat Clean') return true;
    return false;
  }

  // Difficulty distribution is a separate soft cap from muscle/ballistic balance: when a
  // tester opts into a broad level range (not Advanced-only), a flow that randomly lands
  // 5-6 Advanced picks in a row is a real "this reads like a bad session" outcome, the
  // same category of problem MUSCLE_CAPS exists to prevent, just on a different axis. Only
  // Advanced is capped - Beginner/Intermediate flows aren't a fatigue-stacking risk the
  // same way, so there's nothing to guard against there.
  var DIFFICULTY_CAPS = { Advanced: 2 };
  function difficultyCap(difficulty){ return DIFFICULTY_CAPS.hasOwnProperty(difficulty) ? DIFFICULTY_CAPS[difficulty] : Infinity; }

  // avoidNames is a soft exclusion list (e.g. recently-served exercises), muscleCounts (plus
  // the companion difficultyCounts/ballisticCount) is a soft balance filter (e.g. don't add
  // a 3rd shoulder-dominant move, or a 3rd Advanced move, or a 2nd ballistic move, to this
  // flow) - all applied only when they don't empty the pool, so a narrow category/equipment/
  // level combo (or a category that's inherently one muscle, like an all-Presses session)
  // always still returns something rather than nothing.
  function pickForCategory(category, activeLevels, equipment, avoidNames, mustExclude, muscleCounts, difficultyCounts, ballisticCount){
    var equipmentOk = equipment === 2 ? function(){ return true; } : function(e){ return !e.requiresTwoBells; };
    var byCategory = EXERCISES.filter(function(e){ return e.category === category; });
    var byEquipment = byCategory.filter(equipmentOk);
    var candidates = byEquipment.filter(function(e){ return activeLevels.indexOf(e.difficulty) !== -1; });
    var pool = candidates.length > 0 ? candidates : (byEquipment.length > 0 ? byEquipment : byCategory);
    // A swap must actually change what's on screen whenever a different option exists —
    // otherwise re-rolling the same pool can silently land back on the exercise the
    // person just tapped away from, which reads as a broken button.
    if (mustExclude){
      var withoutCurrent = pool.filter(function(e){ return e.name !== mustExclude; });
      if (withoutCurrent.length > 0) pool = withoutCurrent;
    }
    // Muscle/difficulty/ballistic balance runs BEFORE avoidNames, deliberately. All are
    // soft filters, but order matters when they compete for the same small pool of "safe"
    // options: applying avoidNames first can strip out exactly the balanced picks a
    // category has (because they were used last session), leaving balance to choose from
    // whatever's left over - which defeats it far more often than either filter would
    // alone. Deciding "don't overload this flow" before "don't repeat yourself" means a
    // repeated exercise is an acceptable fallback, but an overloaded shoulder/Advanced-
    // heavy/double-ballistic flow isn't.
    if (muscleCounts){
      difficultyCounts = difficultyCounts || {};
      ballisticCount = ballisticCount || 0;
      // Only guard against an Advanced-heavy flow when the tester actually opted into a
      // range - an Advanced-only selection should still return an all-Advanced flow.
      var applyDifficultyCap = activeLevels.length > 1;
      // Each dimension gets its own graduated relaxation, applied in sequence on top of
      // whatever survived the previous dimension - NOT a single shared relax counter.
      // A shared counter meant relaxing one dimension (say muscle balance, because the
      // remaining pool was muscle-starved) silently relaxed the OTHER dimensions too, even
      // though nothing about them required it - e.g. loosening the ballistic cap from
      // "< 1" to "< 2" purely as a side effect of the muscle filter needing more room,
      // letting a second ballistic move slip into a flow that still had non-ballistic
      // options left. Filtering one dimension at a time keeps each cap independent: a
      // dimension only loosens when IT would otherwise empty the pool.
      var relaxDimension = function(candidatePool, isOk){
        for (var relax = 0; relax <= 3; relax++){
          var filtered = candidatePool.filter(function(e){ return isOk(e, relax); });
          if (filtered.length > 0) return filtered;
        }
        return candidatePool;
      };
      pool = relaxDimension(pool, function(e, relax){
        return (e.muscles || []).every(function(m){ return (muscleCounts[m] || 0) < muscleCap(m) + relax; });
      });
      pool = relaxDimension(pool, function(e, relax){
        return !applyDifficultyCap || (difficultyCounts[e.difficulty] || 0) < difficultyCap(e.difficulty) + relax;
      });
      pool = relaxDimension(pool, function(e, relax){
        return !isBallistic(e) || ballisticCount < BALLISTIC_CAP + relax;
      });
    }
    if (avoidNames && avoidNames.length > 0){
      var fresh = pool.filter(function(e){ return avoidNames.indexOf(e.name) === -1; });
      if (fresh.length > 0) pool = fresh;
    }
    return pool[Math.floor(Math.random() * pool.length)];
  }

  function pickExercises(levels, equipment, categories, avoidNames){
    var activeLevels = levels.length > 0 ? levels : LEVELS;
    var activeCategories = categories && categories.length > 0 ? categories : CATEGORIES;
    // Vary session size: 5 or 6 movements (or fewer if categories were excluded), one per chosen category.
    // With 6 total categories, this keeps the same near-full coverage the old 4-or-5-of-5 range gave —
    // a session almost always touches every movement pattern, occasionally skipping just one.
    var desired = Math.random() < 0.5 ? 5 : 6;
    var count = Math.min(desired, activeCategories.length);
    var chosenCategories = shuffled(activeCategories).slice(0, count)
      .sort(function(a, b){ return CATEGORIES.indexOf(a) - CATEGORIES.indexOf(b); });
    // Build the flow one category at a time (not a plain .map) so each pick can see what
    // muscle/difficulty/ballistic load the flow has accumulated so far and steer away from
    // stacking more of the same on top - see MUSCLE_CAPS / pickForCategory above.
    var muscleCounts = {};
    var difficultyCounts = {};
    var ballisticCount = 0;
    return chosenCategories.map(function(category){
      var exercise = pickForCategory(category, activeLevels, equipment, avoidNames, null, muscleCounts, difficultyCounts, ballisticCount);
      (exercise.muscles || []).forEach(function(m){ muscleCounts[m] = (muscleCounts[m] || 0) + 1; });
      difficultyCounts[exercise.difficulty] = (difficultyCounts[exercise.difficulty] || 0) + 1;
      if (isBallistic(exercise)) ballisticCount += 1;
      return exercise;
    });
  }

  function repetitionTarget(exercise){
    var name = exercise.name.toLowerCase();
    if (name.indexOf('walk') !== -1 || name.indexOf('march') !== -1 || name.indexOf('carry') !== -1){
      // Farmer's Walk (a bell in each hand) and Bear Hug Carry (one bell hugged with both
      // arms) are both-arms-at-once the whole time, so there's no "side" to switch.
      return (name.indexOf('farmer') !== -1 || name.indexOf('bear hug') !== -1) ? '20 steps' : '20 steps / side';
    }
    if (name.indexOf('get-up') !== -1) return '2 / side';
    // Single-leg work is per-side by nature; single-arm deadlifts are unilateral in the
    // same way even though "single-leg" doesn't appear in the name. Kickstand variants
    // are also committed to one leg for the whole set, not alternated rep-by-rep.
    if (name.indexOf('single-leg') !== -1 || name.indexOf('kickstand') !== -1 || (name.indexOf('single-arm') !== -1 && name.indexOf('deadlift') !== -1)) return '8 / side';
    // Static holds (in any category) are timed, not repped — check this before the
    // category branches below, since e.g. a Core-category hold would otherwise get
    // caught by the Core branch's '8 / side' before ever reaching this check.
    if (name.indexOf('hold') !== -1) return '20 sec hold';
    if (name.indexOf('sit-up') !== -1 || name.indexOf('toe touch') !== -1) return '12 reps';
    if (exercise.category === 'Hinges'){
      if (name.indexOf('snatch') !== -1 || name.indexOf('clean') !== -1) return '6 reps';
      // Dead-stop swings reset fully between reps (no continuous momentum to ride), so
      // coaching sources prescribe them lower-rep than a flowing swing (3-5 vs. ~10).
      if (name.indexOf('dead-stop') !== -1) return '5 reps';
      return '10 reps';
    }
    if (exercise.category === 'Core') return '8 / side';
    if (exercise.category === 'Squats'){
      if (name.indexOf('pistol') !== -1) return '5 / side';
      if (name.indexOf('side squat') !== -1) return '8 / side';
      // Bulgarian split squat is done as a full set on one leg before switching, like a
      // pistol squat, rather than alternated rep-by-rep like the walking/reverse lunges.
      if (name.indexOf('bulgarian') !== -1) return '8 / side';
      return '8 reps';
    }
    if (exercise.category === 'Presses' || exercise.category === 'Rows'){
      // With one bell, presses/rows are almost always done one arm at a time, then
      // switched — that's the right default. This list is the exceptions: moves where
      // both arms work together (either on one shared bell, or two bells at once), so
      // there's no "side" to switch and a flat rep count is correct instead.
      var bilateral = [
        'kettlebell floor press', 'double clean & jerk', 'double kettlebell thruster',
        'see-saw press', 'double kettlebell bent-over row', 'kettlebell upright row',
        'gorilla row', 'kettlebell pullover', 'kettlebell renegade row', 'kettlebell front raise',
        'double kettlebell strict press', 'two-handed kettlebell row'
      ];
      return bilateral.indexOf(name) !== -1 ? '8 reps' : '8 / side';
    }
    return '8 / side';
  }

  // ---------- Demo videos ----------
  // One curated YouTube demo per exercise (video id). Exercises without one fall back to
  // a YouTube search for the move.
  // Verified 2026-10-15. Bear Hug Carry uses a sandbag demo; the hold is the same with a bell.
  var VIDEOS = {
    "Kettlebell Deadlift": "PrELOSH4E5s",
    "Kettlebell Sumo Deadlift": "FpeXq8U6KdA",
    "Kettlebell Suitcase Deadlift": "eUjU3YBHe-Y",
    "Single-Leg Deadlift": "b9bHy3ojQWA",
    "Kettlebell Good Morning": "JENidBlddKw",
    "Kettlebell Bridge": "LmzW73kIcX4",
    "Two-Handed Kettlebell Swing": "bDCeXbMJVNs",
    "Single-Arm Kettlebell Swing": "mVwhivtXobw",
    "Hand-to-Hand Swing": "6yCoAL9UTiQ",
    "Double Kettlebell Swing": "LObBiCb8K_k",
    "Figure 8s": "xpHWMC2_e3c",
    "Kettlebell Clean": "lyL5JgYNRxo",
    "Kettlebell High Pull": "Li4g5p6s2eM",
    "Kettlebell Snatch": "5zDasPxm8Go",
    "Double Kettlebell Snatch": "aR66q7GkEK0",
    "Double Kettlebell High Pull": "fEM49HEY_UQ",
    "Rotational Clean": "Iofsc9ssQPE",
    "Lateral Kettlebell Swing": "u1FKZSOFSd4",
    "Kettlebell Goblet Squat": "QilYZ20kVfM",
    "Kettlebell Sumo Squat": "3h1A9GfB07w",
    "Kettlebell Forward Lunge": "9lhSQ8NEkLA",
    "Racked Squat": "JbsLVsh04zY",
    "Double Front Squat": "6XghYOzny8U",
    "Racked Reverse Lunge": "zmndn4P_h-k",
    "Tactical Lunge": "xJFPMAMv1bU",
    "Kettlebell Curtsy Lunge": "QjB3HK3RKNA",
    "Cossack Squat": "TMS5xaMBFcU",
    "Deck Squat": "t5DjwAd5q20",
    "Kettlebell Pistol Squat": "3dMMJMSpFV0",
    "Overhead Squat": "IoAtEgb47zs",
    "Kettlebell Floor Press": "4ULa6AJcjr8",
    "Strict Overhead Press": "ykyeHMRKQPU",
    "Push Press": "k4q6HkT99iA",
    "Half-Kneeling Press": "fxSroF2cY_g",
    "Single-Arm Thruster": "ZvwloquB53I",
    "Single-Arm Clean & Press": "qx5AUuLvRMY",
    "Kettlebell Jerk": "IR32hqinsRo",
    "Double Clean & Jerk": "hGWjeTBnJ-A",
    "Sots Press": "_c5ev_4H6V0",
    "Bottoms-Up Press": "8Se-8JdxD5Y",
    "Double Kettlebell Thruster": "y0QfDZvoJcQ",
    "See-Saw Press": "pGrvN6W_Tio",
    "Single-Arm Kettlebell Row": "j2OdaGOmHlM",
    "Double Kettlebell Bent-Over Row": "ygFBq3Bfb4c",
    "Kettlebell Upright Row": "eYcJjTt4-d0",
    "Tactical Row": "iTCajlaHO6c",
    "Gorilla Row": "InypiNiUBmc",
    "Kettlebell Pullover": "b6JhIX3H2Nc",
    "Kettlebell Renegade Row": "c-JihsCBKOw",
    "Kettlebell Batwing Hold": "x0QNaZJtHnc",
    "Kettlebell Slingshot": "uwwlJAwn5zM",
    "Kettlebell Halo": "13SFATc-mJ4",
    "Half-Kneeling Halo": "-IOpI9s1Ku0",
    "Kettlebell Russian Twist": "aHRDQPvoTwA",
    "Kettlebell Sit-Up": "wXZxPX4Cv04",
    "Kettlebell Side Bend": "ID1jyiDcQI8",
    "Farmer's Walk": "92cwGLa-wdQ",
    "Suitcase Walk": "CsSQtaE9SAQ",
    "Rack Carry": "smkxkmKh0ns",
    "Kettlebell Waiter's Walk": "rTHpDPEkab8",
    "Overhead March": "KJ7-e_FvU9k",
    "Plank Drags": "gXCjvDWbmtw",
    "Kettlebell Windmill": "Vl7yY1isVGk",
    "Turkish Get-Up": "0bWRPC49-KI",
    "Bottoms-Up Waiter's Walk": "mEotJIG309I",
    "Figure 8 to a Hold": "vE1j8EDYxxs",
    "Single-Arm Kettlebell Deadlift": "4SFg7GaKI0A",
    "Kettlebell Side Squat": "Gh6b-ZzaJvI",
    "Kettlebell Front Raise": "1W3bpn0AnzM",
    "Kettlebell Around-the-Body Pass": "mXerMyggTd8",
    "Kettlebell Toe Touch": "6ThbhJ2yi6E",
    "Double Kettlebell Strict Press": "tLQt4ccmPQ4",
    "Two-Handed Kettlebell Row": "mG8UOxszXQ8",
    "Bear Hug Carry": "QQ0beWNWnGQ",
    "Kettlebell Dead Bug Hold": "iY5ys5BqzH8",
    "Dead-Stop Swing": "hUj6HluTYfU",
    "Kettlebell Squat Clean": "yK-s3HEe3A0",
    "Overhead Reverse Lunge": "MaT_pIPwnGw",
    "Goblet Clean": "-MZdvT0Pw40",
    "Kickstand Suitcase Deadlift": "o7SDohlDFbY",
    "Half-Snatch": "oMFHmFN__7U",
    "Bulgarian Split Squat": "Pz9pt3BfGTQ"
  };

  function slugify(name){ return name.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
  function videoId(exercise){ return VIDEOS[exercise.name] || null; }
  function videoUrl(exercise){
    var id = videoId(exercise);
    return id ? 'https://www.youtube.com/watch?v=' + id
              : 'https://www.youtube.com/results?search_query=' + encodeURIComponent(exercise.name + ' kettlebell how to');
  }
  function thumbnailUrl(exercise, size){
    var id = videoId(exercise);
    return id ? 'https://i.ytimg.com/vi/' + id + '/' + (size || 'hqdefault') + '.jpg' : null;
  }
  function findExerciseByName(name){
    for (var i = 0; i < EXERCISES.length; i++) if (EXERCISES[i].name === name) return EXERCISES[i];
    return null;
  }

  // ---------- Shared UI helpers ----------
  function escapeHtml(str){
    return String(str).replace(/[&<>"']/g, function(c){ return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]; });
  }
  function metaText(exercise){
    return exercise.category + ' · ' + exercise.difficulty + (exercise.requiresTwoBells ? ' · 2 bells' : '');
  }
  var CHEVRON = '<svg class="ex-chev" width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m6 9 6 6 6-6" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var PLAY = '<svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7L8 5Z" fill="#fff"/></svg>';
  var KB_ICON = '<svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="7" y="2.5" width="10" height="8.5" rx="4.2" stroke="#8A919E" stroke-width="2"/><circle cx="12" cy="15.5" r="6.3" fill="#8A919E"/></svg>';
  // Hand-made start/end diagrams live at images/moves/<slug>.png (3:2). Cards try the diagram
  // first; when the file doesn't exist the <img> errors and diagramFallback() swaps in the
  // YouTube preview instead, so new diagrams show up just by adding the file.
  function diagramUrl(exercise){ return 'images/moves/' + slugify(exercise.name) + '.png'; }
  function diagramFallback(img, kind){
    var wrap = img.closest('[data-ex]');
    var exercise = findExerciseByName(wrap.getAttribute('data-ex'));
    if (kind === 'thumb'){
      var src = thumbnailUrl(exercise, 'mqdefault');
      wrap.classList.remove('diagram');
      if (src){ img.onerror = null; img.src = src; }
      else { img.remove(); wrap.classList.add('empty'); wrap.insertAdjacentHTML('afterbegin', KB_ICON); }
    } else {
      wrap.outerHTML = videoPreviewHtml(exercise);
    }
  }
  // Small thumbnail for a list row. `badge` is optional (e.g. the exercise's position in a workout).
  function thumbHtml(exercise, badge){
    var num = badge ? '<span class="ex-num">' + badge + '</span>' : '';
    return '<span class="ex-thumb diagram" data-ex="' + escapeHtml(exercise.name) + '">' +
      '<img src="' + diagramUrl(exercise) + '" alt="" loading="lazy" onerror="KB.diagramFallback(this, \'thumb\')">' + num + '</span>';
  }
  // Main image for an expanded card: the start/end diagram, or the video preview if there isn't one.
  function videoHtml(exercise){
    return '<figure class="diagram-full" data-ex="' + escapeHtml(exercise.name) + '">' +
      '<img src="' + diagramUrl(exercise) + '" alt="' + escapeHtml(exercise.name) + ': start and end positions" loading="lazy" onerror="KB.diagramFallback(this, \'full\')">' +
      '<figcaption class="video-caption">Start and end positions</figcaption></figure>';
  }
  // Large tappable video preview.
  function videoPreviewHtml(exercise){
    var src = thumbnailUrl(exercise, 'hqdefault');
    if (!src) return '';
    return '<a class="video" href="' + videoUrl(exercise) + '" target="_blank" rel="noopener" aria-label="Watch a demo of ' + escapeHtml(exercise.name) + '">' +
      '<img src="' + src + '" alt="' + escapeHtml(exercise.name) + ' demo video" loading="lazy">' +
      '<span class="play"><span>' + PLAY + '</span></span></a>' +
      '<div class="video-caption">Tap to watch the demo on YouTube</div>';
  }
  function videoLinkHtml(exercise){
    var label = VIDEOS[exercise.name] ? 'Watch demo' : 'Find a video';
    return '<a class="link-btn video-link" href="' + videoUrl(exercise) + '" target="_blank" rel="noopener">' +
      '<svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7L8 5Z" fill="currentColor"/></svg>' + label + '</a>';
  }
  // Setup, steps, and common mistakes for a move (the "full form guide").
  function formGuideHtml(exercise){
    var list = function(items, tag){
      return '<' + tag + '>' + items.map(function(s){ return '<li>' + escapeHtml(s) + '</li>'; }).join('') + '</' + tag + '>';
    };
    return '<div class="cue"><div class="cue-label">Setup</div><p>' + escapeHtml(exercise.setup) + '</p></div>' +
      '<div class="cue"><div class="cue-label">How to do it</div>' + list(exercise.steps, 'ol') + '</div>' +
      '<div class="cue mistakes"><div class="cue-label">Common mistakes</div>' + list(exercise.mistakes, 'ul') + '</div>';
  }

  window.KB = {
    LEVELS: LEVELS, CATEGORIES: CATEGORIES, EXERCISES: EXERCISES, VIDEOS: VIDEOS,
    pickExercises: pickExercises, pickForCategory: pickForCategory, isBallistic: isBallistic,
    repetitionTarget: repetitionTarget, findExerciseByName: findExerciseByName,
    slugify: slugify, videoUrl: videoUrl, thumbnailUrl: thumbnailUrl, diagramUrl: diagramUrl, diagramFallback: diagramFallback,
    escapeHtml: escapeHtml, metaText: metaText, thumbHtml: thumbHtml, videoHtml: videoHtml,
    videoLinkHtml: videoLinkHtml, formGuideHtml: formGuideHtml, CHEVRON: CHEVRON
  };
})();
