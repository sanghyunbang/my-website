import type {ReactNode} from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;          // 카드 제목 (한글)
  imgUrl?: string;        // 외부 이미지 URL
  description: ReactNode; // 설명 (한글)
  tags?: string[];        // 뱃지
};

// 이미지는 자유롭게 바꿀 예정
const FeatureList: FeatureItem[] = [
  {
    title: '안녕하세요, 방상현입니다',
    imgUrl:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1600&auto=format&fit=crop',
    description: (
      <>
        React·Flutter로 <b>사용자 경험</b>을 만들고,
        Spring Boot와 데이터로 <b>문제를 해결</b>합니다.
        요즘은 작은 실험을 빠르게 돌려
        <b> 배운 것을 제품에 반영</b>하는 데 관심이 많아요.
      </>
    ),
    tags: ['Frontend', 'Backend', 'AI/ML'],
  },
];

function FeatureCard({title, imgUrl, description, tags}: FeatureItem) {
  // 링크 비활성 (display-only)
  return (
    <div className={clsx('col col--8 col--offset-2', styles.cardCol)}>
      <div className={styles.card} role="article" aria-label={title}>
        {imgUrl && (
          <div className={styles.thumbWrap}>
            <img src={imgUrl} alt={title} className={styles.thumb} loading="lazy" />
          </div>
        )}
        <div className={styles.body}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.desc}>{description}</p>
          {tags && tags.length > 0 && (
            <div className={styles.tags}>
              {tags.map((t) => (
                <span key={t} className={styles.tag}>{t}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.featuresSection}>
      <div className="container">
        <div className="row">
          {FeatureList.map((item, idx) => (
            <FeatureCard key={idx} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
