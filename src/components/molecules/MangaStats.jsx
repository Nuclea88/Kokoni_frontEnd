import StatItem from '../atoms/StatItem';

const MangaStats = ({ averageScore, status, rankPosition, readersCount }) => (
    <div className="flex justify-between items-center text-center">
        <StatItem 
            label="Score" 
            value={averageScore?.toString()} 
            valueColor="text-primary" 
            hasGlow 
        />
        <StatItem 
            label="Status" 
            value={status} 
            valueColor="text-secondary" 
        />
        <StatItem 
            label="Rank" 
            value={rankPosition ? `#${rankPosition}` : '-'} 
        />
        <StatItem 
            label="Read" 
            value={`${readersCount || 0}`} 
        />
    </div>
);
export default MangaStats;