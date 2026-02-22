import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'

function App() {
  const [tasks, setTasks] = useState([])
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => setSession(session))
    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (session) fetchTasks()
  }, [session])

  async function fetchTasks() {
    const { data, error } = await supabase.from('tasks').select('*').order('id', { ascending: false })
    if (!error) setTasks(data)
  }

  async function addTask(e) {
    e.preventDefault()
    if (!newTaskTitle.trim()) return
    const { data, error } = await supabase
      .from('tasks')
      .insert([{ title: newTaskTitle, is_completed: false, user_id: session.user.id }])
      .select()
    if (!error) { setTasks([data[0], ...tasks]); setNewTaskTitle('') }
  }

  // --- NEW VIBRANT STYLES ---
  const styles = {
    appWrapper: {
      minHeight: '100vh',
      width: '100vw',
      backgroundColor: '#f0ead6', // Corkboard/Paper color
      backgroundImage: `radial-gradient(#d1d1d1 1px, transparent 1px)`, // Dot grid pattern
      backgroundSize: '20px 20px',
      padding: '40px',
      boxSizing: 'border-box',
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      overflowX: 'hidden'
    },
    // The Floating Stickers for the "Blank Sides"
    sideSticker: (top, left, rotate, size) => ({
      position: 'absolute',
      top: top,
      left: left,
      fontSize: size || '60px',
      transform: `rotate(${rotate}deg)`,
      userSelect: 'none',
      filter: 'drop-shadow(5px 5px 0px rgba(0,0,0,0.1))',
      zIndex: 1
    }),
    card: {
      width: '100%',
      maxWidth: '500px',
      backgroundColor: 'white',
      borderRadius: '25px',
      padding: '40px',
      border: '4px solid #1a1a1a',
      boxShadow: '15px 15px 0px #1a1a1a', // Hard pop-art shadow
      zIndex: 10,
      position: 'relative'
    },
    welcomeText: {
      fontSize: '28px',
      color: '#1a1a1a', // Deep black for max contrast
      textAlign: 'center',
      marginBottom: '20px',
      fontWeight: '900',
      textTransform: 'uppercase',
      letterSpacing: '-1px'
    },
    nameHighlight: {
      color: '#FF6B6B', // Vibrant coral
      padding: '0 5px',
      backgroundColor: '#FFF3B0', // Yellow highlighter effect
      borderRadius: '5px'
    }
  }

  if (!session) {
    return (
      <div style={styles.appWrapper}>
        <div style={styles.card}>
          <h1 style={styles.welcomeText}>Stride Goals 🚀</h1>
          <button 
            style={{ width: '100%', padding: '20px', backgroundColor: '#333', color: 'white', borderRadius: '15px', fontWeight: 'bold', cursor: 'pointer' }}
            onClick={() => supabase.auth.signInWithOAuth({ provider: 'github' })}
          >
            LOGIN WITH GITHUB 🐱
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={styles.appWrapper}>
      {/* Background Stickers to fill the "Blank Side" */}
      <div style={styles.sideSticker('10%', '5%', -15)}>🎨</div>
      <div style={styles.sideSticker('60%', '10%', 20)}>⭐</div>
      <div style={styles.sideSticker('15%', '85%', 10)}>🎯</div>
      <div style={styles.sideSticker('70%', '80%', -25, '80px')}>🔥</div>
      <div style={styles.sideSticker('40%', '90%', 5, '40px')}>🌈</div>
      <div style={styles.sideSticker('85%', '5%', 15, '50px')}>⚡</div>

      <div style={styles.card}>
        <h2 style={styles.welcomeText}>
          Yo, <span style={styles.nameHighlight}>
            {session.user.user_metadata?.full_name?.split(' ')[0] || 'Goal Getter'}
          </span>! ⚡
        </h2>
        
        <form onSubmit={addTask} style={{ marginBottom: '30px' }}>
          <input 
            style={{ width: '100%', padding: '15px', borderRadius: '12px', border: '3px solid #1a1a1a', fontSize: '18px', marginBottom: '10px', boxSizing: 'border-box' }}
            placeholder="What's the mission?" 
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
          />
          <button style={{ width: '100%', padding: '15px', backgroundColor: '#4ECDC4', border: '3px solid #1a1a1a', borderRadius: '12px', fontWeight: 'bold', fontSize: '18px', cursor: 'pointer', boxShadow: '5px 5px 0px #1a1a1a' }} type="submit">
            STAPLE IT! 📎
          </button>
        </form>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {tasks.map((task) => (
            <div key={task.id} style={{ 
              backgroundColor: task.is_completed ? '#A8E6CF' : '#FFF', 
              padding: '15px', 
              borderRadius: '12px', 
              border: '3px solid #1a1a1a',
              boxShadow: '4px 4px 0px #1a1a1a',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              transform: `rotate(${Math.random() * 2 - 1}deg)`
            }}>
              <span style={{ fontWeight: 'bold', color: '#1a1a1a' }}>{task.title}</span>
              {task.is_completed && <span>✅</span>}
            </div>
          ))}
        </div>

        <button 
          onClick={() => supabase.auth.signOut()}
          style={{ marginTop: '30px', background: 'none', border: 'none', color: '#666', cursor: 'pointer', textDecoration: 'underline' }}
        >
          Peace out (Logout) 🚪
        </button>
      </div>
    </div>
  )
}

export default App