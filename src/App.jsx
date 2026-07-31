import { useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, Pressable, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const initialTasks = [
  { id: 1, title: 'Review project brief', meta: 'Work  ·  25 min', done: true, color: 'coral' },
  { id: 2, title: 'Morning walk', meta: 'Wellness  ·  20 min', done: false, color: 'yellow' },
  { id: 3, title: 'Read 10 pages', meta: 'Personal  ·  15 min', done: false, color: 'mint' },
]

export default function App() {
  const [tasks, setTasks] = useState(initialTasks)
  const [newTask, setNewTask] = useState('')
  const [activeTab, setActiveTab] = useState('Today')

  const completedCount = tasks.filter((task) => task.done).length
  const progress = tasks.length ? Math.round((completedCount / tasks.length) * 100) : 0

  function toggleTask(id) {
    setTasks((current) => current.map((task) => (
      task.id === id ? { ...task, done: !task.done } : task
    )))
  }

  function addTask() {
    const title = newTask.trim()
    if (!title) return
    setTasks((current) => [...current, {
      id: Date.now(),
      title,
      meta: 'Personal  ·  New task',
      done: false,
      color: 'blue',
    }])
    setNewTask('')
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.appFrame}>
        <View style={styles.topbar}>
          <View style={styles.brandMark}><Ionicons name="sparkles" size={16} color="#f7f7f2" /></View>
          <Text style={styles.brandName}>daylight</Text>
          <Pressable style={styles.avatarButton} accessibilityLabel="Open profile"><Ionicons name="person-outline" size={18} color="#29362e" /></Pressable>
        </View>

        <View style={styles.intro}>
          <Text style={styles.eyebrow}>Thursday, July 31</Text>
          <Text style={styles.title}>Make today{`\n`}<Text style={styles.titleAccent}>count.</Text></Text>
          <Text style={styles.introCopy}>A little progress is still progress.{`\n`}Keep your rhythm going.</Text>
        </View>

        <View style={styles.progressCard} accessibilityLabel={`${progress}% daily progress`}>
          <View><Text style={styles.progressLabel}>TODAY'S PROGRESS</Text><Text style={styles.progressValue}>{completedCount} <Text style={styles.progressSmall}>of {tasks.length} complete</Text></Text></View>
          <View style={styles.progressRing}><View style={styles.progressRingInner}><Text style={styles.progressPercent}>{progress}%</Text></View></View>
        </View>

        <View style={styles.sectionHeading}><Text style={styles.heading}>Today's focus</Text><Text style={styles.taskCount}>{tasks.length} tasks</Text></View>

        <View style={styles.taskList}>
          {tasks.map((task) => (
            <Pressable style={styles.taskCard} key={task.id} onPress={() => toggleTask(task.id)}>
              <View style={[styles.taskIcon, { backgroundColor: colors[task.color] }]}><Ionicons name={task.done ? 'checkmark' : 'ellipse-outline'} size={17} color={task.done ? '#fff' : '#356857'} /></View>
              <View style={styles.taskInfo}><Text style={[styles.taskTitle, task.done && styles.doneTitle]}>{task.title}</Text><Text style={styles.taskMeta}>{task.meta}</Text></View>
              <Ionicons name="arrow-up-outline" size={19} color="#adb4ab" />
            </Pressable>
          ))}
        </View>

        <View style={styles.quickAdd}><Ionicons name="add" size={19} color="#9aa39a" /><TextInput value={newTask} onChangeText={setNewTask} placeholder="Add a new focus" placeholderTextColor="#a6ada5" style={styles.input} returnKeyType="done" onSubmitEditing={addTask} /><Pressable onPress={addTask} style={styles.addButton}><Text style={styles.addButtonText}>Add</Text></Pressable></View>

        <View style={styles.streakCard}><Ionicons name="flame" size={20} color="#d8754e" /><View><Text style={styles.streakTitle}>3 day streak</Text><Text style={styles.streakCopy}>You're building something good.</Text></View><Text style={styles.streakDots}>•••</Text></View>
      </ScrollView>

      <View style={styles.bottomNav}>
        {[['Today', 'home-outline'], ['Plans', 'list-outline'], ['Profile', 'person-outline']].map(([label, icon]) => (
          <Pressable style={styles.navButton} key={label} onPress={() => setActiveTab(label)}><Ionicons name={activeTab === label ? icon.replace('-outline', '') : icon} size={19} color={activeTab === label ? '#304238' : '#a4aca2'} /><Text style={[styles.navLabel, activeTab === label && styles.activeNavLabel]}>{label}</Text></Pressable>
        ))}
      </View>
    </SafeAreaView>
  )
}

const colors = { coral: '#e77c64', yellow: '#f2cb73', mint: '#b3d6c2', blue: '#b7d3df' }

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f7f7f2' }, appFrame: { padding: 27, paddingBottom: 110 }, topbar: { flexDirection: 'row', alignItems: 'center', gap: 10 }, brandMark: { alignItems: 'center', justifyContent: 'center', width: 29, height: 29, borderRadius: 15, backgroundColor: '#29362e' }, brandName: { fontSize: 15, fontWeight: '700', color: '#29362e' }, avatarButton: { alignItems: 'center', justifyContent: 'center', width: 36, height: 36, marginLeft: 'auto', borderRadius: 18, backgroundColor: '#e7ece4' }, intro: { marginTop: 58, marginBottom: 27 }, eyebrow: { marginBottom: 13, color: '#899288', fontSize: 10, letterSpacing: 1.2, textTransform: 'uppercase' }, title: { color: '#29362e', fontSize: 52, lineHeight: 51, fontWeight: '600', letterSpacing: -3 }, titleAccent: { color: '#e5775f', fontStyle: 'italic' }, introCopy: { marginTop: 20, color: '#798179', fontSize: 14, lineHeight: 22 }, progressCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 18, backgroundColor: '#304238' }, progressLabel: { marginBottom: 7, color: '#b8c4b8', fontSize: 10, letterSpacing: 1.2 }, progressValue: { color: '#f7f7f2', fontSize: 25, fontWeight: '700' }, progressSmall: { color: '#b8c4b8', fontSize: 11, fontWeight: '400' }, progressRing: { alignItems: 'center', justifyContent: 'center', width: 67, height: 67, borderRadius: 34, backgroundColor: '#f0bd69' }, progressRingInner: { alignItems: 'center', justifyContent: 'center', width: 55, height: 55, borderRadius: 28, backgroundColor: '#304238' }, progressPercent: { color: '#f7f7f2', fontSize: 12 }, sectionHeading: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', marginTop: 31, marginBottom: 13 }, heading: { color: '#29362e', fontSize: 19, fontWeight: '600' }, taskCount: { color: '#969d94', fontSize: 10 }, taskList: { gap: 9 }, taskCard: { flexDirection: 'row', alignItems: 'center', padding: 13, backgroundColor: '#fffefa', borderWidth: 1, borderColor: '#e8eae3' }, taskIcon: { alignItems: 'center', justifyContent: 'center', width: 33, height: 33, marginRight: 12, borderRadius: 17 }, taskInfo: { flex: 1, gap: 4 }, taskTitle: { color: '#29362e', fontSize: 13, fontWeight: '600' }, doneTitle: { color: '#a5aaa4', textDecorationLine: 'line-through' }, taskMeta: { color: '#969d94', fontSize: 9 }, quickAdd: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 13, padding: 5, paddingLeft: 13, backgroundColor: '#edf0ea' }, input: { flex: 1, minWidth: 0, paddingVertical: 8, color: '#29362e', fontSize: 12 }, addButton: { paddingHorizontal: 11, paddingVertical: 8, backgroundColor: '#304238' }, addButtonText: { color: '#f7f7f2', fontSize: 11 }, streakCard: { flexDirection: 'row', alignItems: 'center', gap: 11, marginTop: 25, padding: 15, backgroundColor: '#f8e5c9' }, streakTitle: { color: '#734b36', fontSize: 12, fontWeight: '600' }, streakCopy: { marginTop: 3, color: '#a77d5e', fontSize: 10 }, streakDots: { marginLeft: 'auto', color: '#d9946b', letterSpacing: 3 }, bottomNav: { position: 'absolute', right: 0, bottom: 0, left: 0, flexDirection: 'row', justifyContent: 'space-around', padding: 15, paddingBottom: 19, backgroundColor: '#f7f7f2', borderTopWidth: 1, borderTopColor: '#eaebe5' }, navButton: { alignItems: 'center', gap: 5, minWidth: 60 }, navLabel: { color: '#a4aca2', fontSize: 10 }, activeNavLabel: { color: '#304238' }, })
